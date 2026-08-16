import {
  IsEmail,
  IsEnum,
  IsArray,
  IsString,
  IsOptional,
  ArrayMinSize,
  MinLength,
} from 'class-validator';

export type ContactType = 'individual' | 'organisation';

// ── Individual ────────────────────────────────────────────────────────────────

export type WorkSituation =
  | 'Employee'
  | 'Freelancer'
  | 'Founder'
  | 'Job seeker'
  | 'Other';

export class IndividualContactDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsEnum(['Employee', 'Freelancer', 'Founder', 'Job seeker', 'Other'])
  workSituation: WorkSituation;

  @IsOptional()
  @IsString()
  helpText?: string;
}

// ── Organisation ──────────────────────────────────────────────────────────────

export type TeamSize = '1–10' | '11–50' | '51–200' | '201–500' | '500+';
export type Interest = 'Pilot' | 'Demo' | 'Partnership' | 'Research collaboration';

export class OrganisationContactDto {
  @IsString()
  @MinLength(1)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(1)
  organisationName: string;

  @IsString()
  @MinLength(1)
  role: string;

  @IsEnum(['1–10', '11–50', '51–200', '201–500', '500+'])
  teamSize: TeamSize;

  @IsArray()
  @ArrayMinSize(1)
  @IsEnum(['Pilot', 'Demo', 'Partnership', 'Research collaboration'], { each: true })
  interestedIn: Interest[];

  @IsString()
  @MinLength(1)
  message: string;
}
