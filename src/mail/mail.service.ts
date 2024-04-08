import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Users } from '../users/model/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(user: Users) {
    const url = `${process.env.API_HOST}:${process.env.PORT}/api/users/activate/${user.activationLink}`;
    console.log(url);
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to stadium app! Confirmation your email',
      template: './confirmation',
      context: {
        name: user.fullName,
        url,
      },
    });
  }
}
