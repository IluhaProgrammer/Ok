import { Query, Controller, Post, Get, Put, Delete, Body, Param, HttpCode, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ProductDto } from './dto/product.dto';
import { GetAllProductDto } from './dto/filter.product.dto';

@Controller('products')
export class ProductController { 
  constructor(private readonly productService: ProductService) {}

  @Get('by-id/:id')
  getById(@Param('id') id : string) {
    return this.productService.getById(id)
  }

  @Post('add')
  @HttpCode(200)
  @Auth()
  createProduct() {
    return this.productService.createProduct()
  }

  @Put(':id')
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  updateProduct(@Param('id') id : string, @Body() data : ProductDto) {
    return this.productService.updateProduct(id, data)
  }

  @Delete('delete/:id')
  @HttpCode(200)
  @Auth()
  deleteProduct(@Param('id') id : string) {
    return this.productService.deleteProduct(id)
  }

  @Get('slug/:categorySlug')
  getByCategory(@Param('categorySlug') categrySlug : string) {
    return this.productService.getByCategory(categrySlug)
  }

  @Get(':name')
  getBByName(@Param('name') name : string) {
    return this.productService.getByName(name)
  }

  @Get()
  @UsePipes(new ValidationPipe())
  getAll(@Query() queryDto : GetAllProductDto) {
    return this.productService.getAall(queryDto)
  }
 
}
