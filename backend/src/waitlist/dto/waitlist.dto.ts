import { IsEmail } from 'class-validator';

export class WaitlistDto {
  @IsEmail()
  email: string;
}
