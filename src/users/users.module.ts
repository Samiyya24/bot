import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Users } from './model/user.model';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { BotModule } from '../bot/bot.module';
import { Bot } from '../bot/model/bot.model';
import { Otp } from '../otp/model/otp.model';
import { OtpModule } from '../otp/otp.module';

@Module({
  imports: [
    // Imports SequelizeModule to provide Sequelize functionality and register the 'Users' model
    SequelizeModule.forFeature([Users, Otp]),
    // Imports JwtModule to provide JWT functionality for user authentication
    JwtModule.register({}),
    // Imports MailModule to provide MailModule for send email
    MailModule,
    // BotModule,
    OtpModule,
  ],
  // Declares UsersController to define HTTP endpoints related to user management
  controllers: [UsersController],
  // Declares UsersService to provide business logic for user-related operations
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {} // Exports UsersModule class as a feature module for user management
