import { Inject, Injectable, Logger } from '@nestjs/common';
import type { App } from 'firebase-admin/app';
import { getFirestore, FieldValue, Firestore } from 'firebase-admin/firestore';
import { FIREBASE_APP } from '../firebase/firebase.module';
import {
  IndividualContactDto,
  OrganisationContactDto,
} from './dto/contact.dto';

@Injectable()
export class ContactService {
  private readonly logger = new Logger(ContactService.name);
  private readonly db: Firestore;

  constructor(@Inject(FIREBASE_APP) firebaseApp: App) {
    this.db = getFirestore(firebaseApp);
  }

  async submitIndividual(dto: IndividualContactDto): Promise<{ id: string }> {
    const docRef = await this.db.collection('contactSubmissions').add({
      type: 'individual',
      name: dto.name,
      email: dto.email,
      workSituation: dto.workSituation,
      helpText: dto.helpText ?? '',
      createdAt: FieldValue.serverTimestamp(),
    });

    this.logger.log(`Individual contact saved: ${docRef.id}`);
    return { id: docRef.id };
  }

  async submitOrganisation(dto: OrganisationContactDto): Promise<{ id: string }> {
    const docRef = await this.db.collection('contactSubmissions').add({
      type: 'organisation',
      name: dto.name,
      email: dto.email,
      organisationName: dto.organisationName,
      role: dto.role,
      teamSize: dto.teamSize,
      interestedIn: dto.interestedIn,
      message: dto.message,
      createdAt: FieldValue.serverTimestamp(),
    });

    this.logger.log(`Organisation contact saved: ${docRef.id}`);
    return { id: docRef.id };
  }
}
