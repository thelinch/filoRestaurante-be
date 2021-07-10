import { Delete, Get, Param, Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { Category } from 'src/order-handling/domain/Category';
import { CategoryBodyRequestDto } from 'src/order-handling/interface/dto/CategoryBodyRequestDto';
import { CategoryRepository } from '../repository/CategoryRepository';

@Controller('categories')
export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) {}

  @Post()
  async created(@Body() categoryBodyRequestDto: CategoryBodyRequestDto) {
    const c = new Category(categoryBodyRequestDto);
    await this.categoryRepository.created(c);
  }

  @Post('/:id/update')
  async updated(
    @Param('id') id: string,
    @Body() categoryBodyRequestDto: CategoryBodyRequestDto,
  ) {
    await this.categoryRepository.save(categoryBodyRequestDto);
  }
  @Get()
  list() {
    return this.categoryRepository.list();
  }
  @Delete('/:id')
  removed(@Param('id') id: string) {
    this.categoryRepository.removed(id);
  }
}
