import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CartService } from './cart.service';
import { UpdateCartDto } from './dto/update-cart.dto';
import { AuthGuard } from '@nestjs/passport';
import { LoggedUser } from 'src/auth/logged-user.decorator';

@ApiTags('cart')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get('total-value')
  @ApiOperation({
    summary: 'Update and get total value of the cart',
  })
  async updateValue(@LoggedUser() user) {
    return await this.cartService.getTotalValue(user.cartId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get cart by id',
  })
  getById(@LoggedUser() user) {
    return this.cartService.findById(user.cartId);
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
