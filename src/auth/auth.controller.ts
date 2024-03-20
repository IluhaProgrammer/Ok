import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LogDto, RefreshDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register') 
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  register(@Body() data : AuthDto) {  
    return this.authService.register(data)
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  login(@Body() data : LogDto) {
    return this.authService.login(data)
  }

  @Post('tokens')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  getNewTokens(@Body() data : RefreshDto) {
    return this.authService.getNewTokens(data.refreshToken)
  }

}
