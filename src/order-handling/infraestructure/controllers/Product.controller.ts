import { Get, UseGuards } from '@nestjs/common';
import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt.authGuard';
import { Product } from '../../domain/Product';
import { ProductBodyRequestDto } from '../../interface/dto/ProductBodyRequestDto';
import { ProductRepository } from '../repository/ProductRepository';

@Controller('products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() productBodyRequestDto: ProductBodyRequestDto) {
    await this.productRepository.created(new Product(productBodyRequestDto));
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async list() {
    return await this.productRepository.list();
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/update')
  async update(@Body() productBodyRequestDto: ProductBodyRequestDto) {
    await this.productRepository.updated(new Product(productBodyRequestDto));
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async delete(@Param('id') productId: string) {
    await this.productRepository.removed(productId);
  }
}
