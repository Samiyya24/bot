import { IsPhoneNumber } from 'class-validator';

export class PhoneUserDto {
  @IsPhoneNumber('UZ')
  phone: string;
}
