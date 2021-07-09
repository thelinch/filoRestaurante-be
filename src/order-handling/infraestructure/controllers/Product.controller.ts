import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { Product } from 'src/order-handling/domain/Product';
import { ProductBodyRequestDto } from 'src/order-handling/interface/dto/ProductBodyRequestDto';
import { ProductRepository } from '../repository/ProductRepository';
import util from '../util/util';
//TODO
@Controller('products')
export class ProductController {
  constructor(private productRepository: ProductRepository) {}

  @Post()
  async create(@Body() productBodyRequestDto: ProductBodyRequestDto) {
    await this.productRepository.created(new Product(productBodyRequestDto));
  }
  @Post('/:id/update')
  async update(@Body() productBodyRequestDto: ProductBodyRequestDto) {
    await this.productRepository.updated(new Product(productBodyRequestDto));
  }
  @Delete('/:id')
  async delete(@Param('id') productId: string) {
    await this.productRepository.removed(productId);
  }
  
}
