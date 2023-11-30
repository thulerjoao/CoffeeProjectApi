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
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all carts',
  })
  getAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get cart by id',
  })
  getById(@Param('id') id: string) {
    return this.cartService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new cart',
  })
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete cart by id',
  })
  delete(@Param('id') id: string) {
    return this.cartService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updating cart by id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.update(id, dto);
  }
}
