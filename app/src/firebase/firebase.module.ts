import { Global, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import type { App } from 'firebase-admin/app';

export const FIREBASE_APP = 'FIREBASE_APP';

@Global()
@Module({
  providers: [
    {
      provide: FIREBASE_APP,
      inject: [ConfigService],
      useFactory: (config: ConfigService): App => {
        // Avoid initialising more than once (e.g. during hot-reload)
        if (getApps().length > 0) {
          return getApps()[0];
        }

        return initializeApp({
          credential: cert({
            projectId: config.getOrThrow<string>('FIREBASE_PROJECT_ID'),
            clientEmail: config.getOrThrow<string>('FIREBASE_CLIENT_EMAIL'),
            // The private key comes from .env as a string;
            // newline escape sequences need to be unescaped.
            privateKey: config
              .getOrThrow<string>('FIREBASE_PRIVATE_KEY')
              .replace(/\\n/g, '\n'),
          }),
        });
      },
    },
  ],
  exports: [FIREBASE_APP],
})
export class FirebaseModule {}
