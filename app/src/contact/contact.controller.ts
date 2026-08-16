import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ContactService } from './contact.service';
import {
  IndividualContactDto,
  OrganisationContactDto,
} from './dto/contact.dto';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  /** POST /contact/individual */
  @Post('individual')
  @HttpCode(HttpStatus.CREATED)
  submitIndividual(@Body() dto: IndividualContactDto) {
    return this.contactService.submitIndividual(dto);
  }

  /** POST /contact/organisation */
  @Post('organisation')
  @HttpCode(HttpStatus.CREATED)
  submitOrganisation(@Body() dto: OrganisationContactDto) {
    return this.contactService.submitOrganisation(dto);
  }
}
