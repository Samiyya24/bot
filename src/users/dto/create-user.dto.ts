import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO (Data Transfer Object) for creating a new user
export class CreateUserDto {
  // User's full name field with string validation and required constraint
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's full name",
  })
  fullName: string;

  // User's password field with string validation, required constraint, and not empty constraint
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: "User's password",
  })
  password: string;

  // User's confirm password field with string validation, required constraint, and not empty constraint
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Confirmation of user password',
  })
  confirPassword: string;

  // User's Telegram link field with string validation
  @IsString()
  @ApiProperty({
    type: String,
    description: 'User Telegram link',
    required: false,
  })
  tgLink: string;

  // User's email field with email validation, required constraint, and not empty constraint
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({
    type: String,
    description: "User's email address",
  })
  email: string;

  // User's phone number field with phone number validation for Uzbekistan, required constraint, and not empty constraint
  @IsNotEmpty()
  @IsPhoneNumber('UZ') // Format: +998907777777
  @ApiProperty({
    type: String,
    description: "User's phone number (Uzbekistan format)",
  })
  phone: string;

  // User's photo URL field with string validation
  @IsString()
  @ApiProperty({
    type: String,
    description: "URL of the user's photo",
    required: false,
  })
  photo: string;
}
