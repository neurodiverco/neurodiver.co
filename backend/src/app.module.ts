import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { ContactModule } from './contact/contact.module';
import { WaitlistModule } from './waitlist/waitlist.module';

@Module({
  imports: [
    // Load .env variables globally so every module can inject ConfigService
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule,
    ContactModule,
    WaitlistModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
