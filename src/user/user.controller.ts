import { Controller, Get, Post, Patch, Put, UsePipes, ValidationPipe, HttpCode, Param, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateDto } from './dto/use.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  getProfile(@CurrentUser('id') id : number) {
    return this.userService.getProfile(id)
  }

  @Put('update-profile')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  updateProfile(@CurrentUser('id') id : number, @Body() data : UpdateDto) {
    return this.userService.updateProfile(id, data)
  }

  @Patch('profile/favorites/:productId')
  @HttpCode(200)
  @Auth()
  toggleFavorite(@CurrentUser('id') id : number, @Param('productId') productId : string) {
    return this.userService.toggleFavorites(+productId, id)
  }

}
