import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { SendmailService } from './sendmail.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { SendEmailDto } from './dto/sendmail.dto';

@Controller('sendmail')
export class SendmailController {
  constructor(private readonly sendmailService: SendmailService) {}

  @Post('to')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  sendMail(@Body() dto : SendEmailDto) {
    return this.sendmailService.sendEmail(dto)
  }

}
