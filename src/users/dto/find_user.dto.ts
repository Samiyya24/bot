import { IsEmail, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO (Data Transfer Object) for creating a new user
export class FindUserDto {
  // User's full name field with string validation and required constraint

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "User's full name",
  })
  fullName?: string;

  // User's Telegram link field with string validation
  @IsString()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: 'User Telegram link',
    required: false,
  })
  tgLink?: string;

  // User's email field with email validation, required constraint, and not empty constraint

  @IsEmail()
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "User's email address",
  })
  email?: string;

  // User's phone number field with phone number validation for Uzbekistan, required constraint, and not empty constraint

  @IsPhoneNumber('UZ') // Format: +998907777777
  @IsOptional()
  @ApiProperty({
    type: String,
    description: "User's phone number (Uzbekistan format)",
  })
  phone?: string;
}
