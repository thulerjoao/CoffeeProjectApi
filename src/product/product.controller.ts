import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UpdateProductDto } from './dto/updates.product.dto';

@ApiTags('product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all products',
  })
  getAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get product by id',
  })
  getById(id: string) {
    return this.productService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new product',
  })
  create(@Body() dto: CreateProductDto) {
    return this.productService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete product by id',
  })
  delete(id: string) {
    return this.productService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updating product by id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productService.update(id, dto);
  }
}
