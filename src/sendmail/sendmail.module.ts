import { Module } from '@nestjs/common';
import { SendmailService } from './sendmail.service';
import { SendmailController } from './sendmail.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  controllers: [SendmailController],
  providers: [SendmailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: 'oli23rewards@gmail.com',
          pass: 'fune dwko gndc wnnz'
        }
      },
    })
  ]
})
export class SendmailModule {}
