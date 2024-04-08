// Importing required modules from Nest.js framework
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { BotModule } from './bot/bot.module';
import { Bot } from './bot/model/bot.model';
import { UsersModule } from './users/users.module';
import { Users } from './users/model/user.model';
import { Otp } from './otp/model/otp.model';
import { OtpModule } from './otp/otp.module';
// -

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule],
      }),
    }),
    // Importing configuration module to load environment variables
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

    // Setting up Sequelize for database operations
    SequelizeModule.forRoot({
      dialect: 'postgres', // Using PostgreSQL dialect
      host: process.env.POSTGRES_HOST, // Getting host from environment variables
      port: Number(process.env.POSTGRES_PORT), // Getting port from environment variables
      username: process.env.POSTGRES_USER, // Getting username from environment variables
      password: process.env.POSTGRES_PASSWORD, // Getting password from environment variables
      database: process.env.POSTGRES_DB, // Getting database name from environment variables
      models: [Bot, Users], // Associating Sequelize models with the database
      autoLoadModels: true, // Automatically loading models from the specified paths
      sync: { alter: true }, // Synchronizing database schema with model definitions (altering tables)
      logging: true, // Enabling logging for database operations
    }),

    BotModule,
    UsersModule,
    // OtpModule,
  ],
  controllers: [], // No controllers defined in this module
  providers: [], // No providers defined in this module
})
export class AppModule {} // Exporting AppModule class as the root module of the application
