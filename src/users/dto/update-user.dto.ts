import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO (Data Transfer Object) for updating user details
export class UpdateUserDto {
  // Optional full name field with string validation
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Optional full name of the user',
  })
  fullName?: string;

  // Optional Telegram link field with string validation
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Optional Telegram link of the user',
  })
  tgLink?: string;

  // Optional email field with email validation
  @IsOptional()
  @IsEmail()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Optional email address of the user',
  })
  email?: string;

  // Optional phone number field with phone number validation for Uzbekistan
  @IsOptional()
  @IsPhoneNumber('UZ') // Format: +998907777777
  @ApiProperty({
    required: false,
    type: String,
    description: 'Optional phone number of the user (Uzbekistan format)',
  })
  phone?: string;

  // Optional photo URL field with string validation
  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description: 'Optional URL of the user photo',
  })
  photo?: string;
}
