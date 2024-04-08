import { Injectable } from '@nestjs/common';
import { CreateBotDto } from './dto/create-bot.dto';
import { UpdateBotDto } from './dto/update-bot.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Bot } from './model/bot.model';
import { InjectBot } from 'nestjs-telegraf';
import { BOT_NAME } from '../app.constants';
import { Context, Markup, Telegraf } from 'telegraf';
import { truncate } from 'fs';
import { UsersService } from '../users/users.service';

@Injectable()
export class BotService {
  private step: any;
  private step1: any;
  private user: any;
  private car: any;
  constructor(
    @InjectModel(Bot) private botRepo: typeof Bot,
    @InjectBot(BOT_NAME) private readonly bot: Telegraf<Context>,
    private readonly users: UsersService,
  ) {
    this.step = 0;
    this.step1 = 0;
    this.user = {};
    this.car = {};
  }

  async start(ctx: Context) {
    this.step = 0;
    this.step1 = 0;
    await ctx.reply(
      'Assalomu alaykum  ' +
        ctx.message.from.first_name +
        '\n' +
        'Avtomobil yuvish uchun Resgistration uchun ekranning pastki qismidagi (Resgistration) tugmasini bosing.',
      {
        reply_markup: {
          keyboard: [
            [{ text: 'Resgistration' }, { text: 'About us' }],
            [{ text: 'Our location 📍' }, { text: 'Contact with us 📲' }],
          ],
          resize_keyboard: true,
        },
      },
    );
  }

  async onMessage(ctx: Context) {
    if ('text' in ctx.message) {
      const ret = 'return back';
      console.log(this.step);

      function returnBack(ctx: Context, user: any, step: any, step1: any) {
        ctx.reply(
          `id: ${user.id}
Name: ${user.name || 'empty'},
Age: ${user.age || 'empty'},
Mashena: ${user.car_name || 'empty'}`,
          {
            reply_markup: {
              keyboard: [
                [{ text: 'Resgistration' }, { text: 'About us' }],
                [{ text: 'Our location 📍' }, { text: 'Contact with us 📲' }],
              ],
              resize_keyboard: true,
            },
          },
        );
      }

      if (ctx.message.text == 'Our location 📍') {
        await ctx.sendLocation(35.804819, 51.43407, {
          live_period: 86400,
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.step == 0 && ctx.message.text == 'Registration') {
        this.user.id = ctx.message.from.id;
        this.step++;
        await ctx.reply('Enter your name', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.step == 1 && this.user.id == ctx.message.from.id) {
        this.user.name = ctx.message.text;
        this.step++;
        await ctx.reply(`Enter your age`, {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.step == 2 && this.user.id == ctx.message.from.id) {
        this.user.age = ctx.message.text;
        this.step++;
        await ctx.reply(`Car name`, {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.step == 3 && this.user.id == ctx.message.from.id) {
        this.user.car_name = ctx.message.text;
        await ctx.reply(
          `id: ${this.user.id}
                      Name: ${this.user.name},
                      Age: ${this.user.age},
                      Mashena: ${this.user.car_name} `,
        );
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (ctx.message.text == 'About us') {
        await ctx.reply(
          'Avtomobillarga xizmat ko’rsatish har doim daromadli xizmat ko’rsatish sohalaridan biri bo’lib kelmoqda. Ayniqsa har bir avtomobil egasi o’z mashinasiga o’zi xizmat ko’rsatsa bu ajoyib imkoniyatdan boshqa narsa emas.',
        );
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (ctx.message.text == 'Resgistration') {
        await ctx.reply('Mashinagizdi turini aytining', {
          reply_markup: {
            keyboard: [[{ text: 'Yengil mashina' }, { text: 'Yuk mashinasi' }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.step1 == 0 && ctx.message.text == 'Yengil mashina') {
        console.log(ctx, 'Yengil mashina');
        this.car.id = ctx.message.from.id;
        this.step1++;
        await ctx.reply('Mashena name', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.step1 == 1 && this.car.id == ctx.message.from.id) {
        this.car.name = ctx.message.text;
        this.step1++;
        await ctx.reply(`Qanday yuvish kerek`, {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.car.id == ctx.message.from.id) {
        console.log(ctx.message.text);
        this.car.yuvish = ctx.message.text;
        this.step1++;
        await ctx.reply(
          `
Yengi mashina
id: ${this.car.id}
Car_name: ${this.car.name},
Type wash: ${this.car.yuvish},
                      `,
        );
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (ctx.message.text == 'Add car') {
        await ctx.reply('Mashinagizdi turini aytining', {
          reply_markup: {
            keyboard: [[{ text: 'Yengil mashina' }, { text: 'Yuk mashinasi' }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.step1 == 0 && ctx.message.text == 'Yuk mashinasi') {
        console.log(ctx, 'Yengil mashina');
        this.car.id = ctx.message.from.id;
        this.step1++;
        await ctx.reply('Mashena name', {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.step1 == 1 && this.car.id == ctx.message.from.id) {
        this.car.name = ctx.message.text;
        this.step1++;
        await ctx.reply(`Qanday yuvish kerek`, {
          reply_markup: {
            keyboard: [[{ text: ret }]],
            resize_keyboard: true,
          },
        });
      } else if (ctx.message.text == ret) {
        this.step1 = --this.step1;
        this.step = --this.step;
        returnBack(ctx, this.user, this.step, this.step1);
      } else if (this.car.id == ctx.message.from.id) {
        console.log(ctx.message.text);
        this.car.yuvish = ctx.message.text;
        this.step1++;
        await ctx.reply(
          `
Yuk Mashinasi
id: ${this.car.id}
Car_name: ${this.car.name},
Type wash: ${this.car.yuvish},
                      `,
        );
      }
    }
  }
}
