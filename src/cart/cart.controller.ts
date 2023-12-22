import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
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
