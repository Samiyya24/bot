import {
  Action,
  Command,
  Ctx,
  Hears,
  On,
  Start,
  Update,
} from 'nestjs-telegraf';
import { Context, Markup } from 'telegraf';
import { inlineKeyboard } from 'telegraf/typings/markup';
import { BotService } from './bot.service';

@Update()
export class BotUpdate {
  constructor(private readonly botService: BotService) {}

  @Start()
  async onStart(@Ctx() ctx: Context) {
    this.botService.start(ctx);
  }

  // @On('contact')
  // async onContact(@Ctx() ctx: Context) {
  //   if ('contact' in ctx.message) {
  //     console.log(ctx.message.contact);
  //     await this.botService.onContact(ctx);
  //   }
  // }

  // @Command('stop')
  // async onStop(@Ctx() ctx: Context) {
  //   await this.botService.onStop(ctx);
  // }
  
  @On('message')
  async onMessage(@Ctx() ctx: Context) {
    if ('text' in ctx.message) {
      await this.botService.onMessage(ctx);
    }
  }
}
