import { IsPhoneNumber, IsString } from 'class-validator';

export class VerifyOtpDto {
  @IsString()
  verification_key: string;

  @IsString()
  otp: string;

  @IsPhoneNumber('UZ')
  check: string;
}
