import { forwardRef, Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { BotUpdate } from './bot.update';
import { SequelizeModule } from '@nestjs/sequelize';
import { Bot } from './model/bot.model';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/model/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Bot, Users]), UsersModule],
  providers: [BotService, BotUpdate],
  exports: [BotService],
})
export class BotModule {}
