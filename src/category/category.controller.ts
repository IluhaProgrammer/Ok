import { Controller, Get, Post, Put, Delete, Body, HttpCode, Param } from '@nestjs/common';
import { CategoryService } from './category.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import {UsePipes} from '@nestjs/common/decorators'
import {ValidationPipe} from '@nestjs/common/pipes'
import { SlugDto } from './dto/category.dto';

@Controller('categories') 
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll() {
    return this.categoryService.getAll()
  }

  @Get(':id')
  getById(@Param('id') id : string) {
    return this.categoryService.getCategory(id)
  }

  @Put(':id')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Auth()
  updateCategory(@Param('id') id : string, @Body() data : SlugDto) {
    return this.categoryService.updateCategory(id, data)
  }

  @Delete(':id')
  @HttpCode(200)
  @Auth()
  deleteCategory(@Param('id') id : string) {
    return this.categoryService.deleteCategory(id)
  }

  @Post('add')
  @HttpCode(200)
  @Auth()
  createCategory() {
    return this.categoryService.createCategory()
  }

}
