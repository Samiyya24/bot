import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

// Interface defining the attributes required for user creation
interface IUserCreationAttr {
  fullName: string;
  hashedPassword: string;
  tgLink: string;
  email: string;
  phone: string;
  photo: string;
}

@Table({ tableName: 'users' }) // Decorator to specify table name for Sequelize
export class Users extends Model<Users, IUserCreationAttr> {
  @ApiProperty({
    example: 1,
    description: "User's unique ID",
  })
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number; // User ID column

  @ApiProperty({
    example: 'John Doe',
    description: 'User full name',
  })
  @Column({
    type: DataType.STRING,
  })
  fullName: string; // User full name column

  @ApiProperty({
    example: 'hashed_password',
    description: 'Hashed password of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  hashedPassword: string; // Hashed password column

  @ApiProperty({
    example: 'https://t.me/user123',
    description: 'Telegram link of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  tgLink: string; // Telegram link column

  @ApiProperty({
    example: 'john@example.com',
    description: 'Email address of the user',
  })
  @Column({
    type: DataType.STRING,
    // unique: true, // Uncomment this line if email should be unique
  })
  email: string; // Email address column

  @ApiProperty({
    example: '+1234567890',
    description: 'Phone number of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  phone: string; // Phone number column

  @ApiProperty({
    example: 'https://example.com/user123.jpg',
    description: "URL of the user's photo",
  })
  @Column({
    type: DataType.STRING,
  })
  photo: string; // URL of user's photo column

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is an owner',
  })
  @Column({
    type: DataType.BOOLEAN,
  })
  isOwner: boolean; // Indicates if the user is an owner column

  @ApiProperty({
    example: true,
    description: 'Indicates if the user is active',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean; // Indicates if the user is active column

  @ApiProperty({
    example: 'hashed_refresh_token',
    description: 'Hashed refresh token of the user',
  })
  @Column({
    type: DataType.STRING,
  })
  hashedRefreshToken: string; // Hashed refresh token column

  @Column({
    type: DataType.STRING,
  })
  activationLink: string; // Activation link for email verification

  // No Swagger comment for class declaration as it is self-explanatory
}
