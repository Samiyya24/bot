import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Otp } from './model/otp.model';

@Module({
  imports: [SequelizeModule.forFeature([Otp])],
  providers: []
})
export class OtpModule {}
