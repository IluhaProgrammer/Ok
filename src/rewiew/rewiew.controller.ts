import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RewiewService } from './rewiew.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { ReviewDto } from './dto/rewiew.dto';

@Controller('rewiews')
export class RewiewController {
  constructor(private readonly rewiewService: RewiewService) {} 

  @Get('avg')
  getAvgRating() {
    return this.rewiewService.getAverageValueByProductId()
  }

  @Post('create')
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  createRewiew(@CurrentUser('id') id : number, @Body() data : ReviewDto) {
    return this.rewiewService.createRewiew(id, data)
  }

  @Get('all')
  getAll() {
    return this.rewiewService.getAll()
  }

  @Delete()
  @HttpCode(200)
  deleteRewiews() {
    return this.rewiewService.deleteAll()
  }

}
