import { Inject, Injectable, Logger, OnModuleDestroy } from '@nestjs/common';
import { Subject } from 'rxjs';
import type { App } from 'firebase-admin/app';
import { getFirestore, FieldValue, Firestore } from 'firebase-admin/firestore';
import { FIREBASE_APP } from '../firebase/firebase.module';
import { WaitlistDto } from './dto/waitlist.dto';

@Injectable()
export class WaitlistService implements OnModuleDestroy {
  private readonly logger = new Logger(WaitlistService.name);
  private readonly db: Firestore;

  /**
   * Every time the waitlist collection changes, Firestore pushes a new
   * count here. SSE clients subscribe to this stream.
   */
  readonly count$ = new Subject<number>();

  /** Unsubscribe handle for the Firestore listener */
  private unsubscribeListener: (() => void) | null = null;

  constructor(@Inject(FIREBASE_APP) firebaseApp: App) {
    this.db = getFirestore(firebaseApp);
    this.startRealtimeListener();
  }

  /** Attach a Firestore onSnapshot listener to the waitlist collection. */
  private startRealtimeListener() {
    this.unsubscribeListener = this.db
      .collection('waitlist')
      .onSnapshot(
        (snapshot) => {
          this.count$.next(snapshot.size);
        },
        (err) => {
          this.logger.error('Firestore waitlist listener error', err);
        },
      );

    this.logger.log('Firestore real-time waitlist listener started');
  }

  /** Clean up the Firestore listener when the module shuts down. */
  onModuleDestroy() {
    this.unsubscribeListener?.();
  }

  async getCount(): Promise<{ count: number }> {
    const snapshot = await this.db.collection('waitlist').count().get();
    return { count: snapshot.data().count };
  }

  async join(dto: WaitlistDto): Promise<{ id: string }> {
    const docRef = this.db.collection('waitlist').doc(dto.email);

    await docRef.set(
      {
        email: dto.email,
        joinedAt: FieldValue.serverTimestamp(),
      },
      { merge: true },
    );

    this.logger.log(`Waitlist entry saved for: ${dto.email}`);
    return { id: docRef.id };
    // The Firestore onSnapshot listener will automatically fire and push
    // the updated count to all SSE subscribers — no manual emit needed.
  }
}
