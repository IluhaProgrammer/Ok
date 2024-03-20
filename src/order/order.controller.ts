import { Controller, Body, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { OrderDto } from './dto/order.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Auth()
  getAll(@CurrentUser('id') id : number) {
    return this.orderService.getAll(id)
  }

  @Post('new-order')
  @Auth()
  @UsePipes(new ValidationPipe())
  placeOrder(@CurrentUser('id') id : number, @Body() data : OrderDto) {
    return this.orderService.placeOrder(data, id)
  }

}
