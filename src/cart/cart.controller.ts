import { Controller, Post, HttpCode, UsePipes, ValidationPipe, Body, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CartAddDto } from './dto/cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post(':name')
  addToCart(@CurrentUser('id') id : number, @Body() dto : CartAddDto, @Param('name') name : string ) {
    return this.cartService.addToCart(dto, name, id)
  }

  @Auth()
  @HttpCode(200)
  @Delete('reset')
  resetCart(@CurrentUser('id') userId : number) {
    return this.cartService.resetCart(userId)
  }

  @Auth()
  @HttpCode(200)
  @Delete(':productId')
  deleteFromCart(@CurrentUser('id') userId : number, @Param('productId') productId : string) {
    return this.cartService.delFromCart(userId, +productId)
  }

}
