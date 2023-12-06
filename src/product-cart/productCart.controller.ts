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
import { CreateProductCartDto } from './dto/create.productCart.dto';
import { UpdateProductCartDto } from './dto/update.productCart.dto';
import { ProductCartService } from './productCart.service';

@ApiTags('productCart')
@Controller('productCart')
export class ProductCartController {
  constructor(private readonly productCartService: ProductCartService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all productCarts',
  })
  getAll() {
    return this.productCartService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get productCart by id',
  })
  getById(@Param('id') id: string) {
    return this.productCartService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new productCart',
  })
  create(@Body() dto: CreateProductCartDto) {
    return this.productCartService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete productCart by id',
  })
  delete(@Param('id') id: string) {
    return this.productCartService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updating productCart by id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateProductCartDto) {
    return this.productCartService.update(id, dto);
  }
}
