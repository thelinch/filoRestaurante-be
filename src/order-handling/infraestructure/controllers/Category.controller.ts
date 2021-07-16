import { Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/jwt.authGuard';
import { Category } from '../../domain/Category';
import { CategoryBodyRequestDto } from '../../interface/dto/CategoryBodyRequestDto';
import { CategoryRepository } from '../repository/CategoryRepository';

@Controller('categories')
export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  async created(@Body() categoryBodyRequestDto: CategoryBodyRequestDto) {
    const c = new Category(categoryBodyRequestDto);
    await this.categoryRepository.created(c);
  }
  @UseGuards(JwtAuthGuard)
  @Post('/:id/update')
  async updated(
    @Param('id') id: string,
    @Body() categoryBodyRequestDto: CategoryBodyRequestDto,
  ) {
    await this.categoryRepository.save(categoryBodyRequestDto);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  list() {
    return this.categoryRepository.list();
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  removed(@Param('id') id: string) {
    this.categoryRepository.removed(id);
  }
}
