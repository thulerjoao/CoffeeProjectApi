import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CartService } from './cart.service';

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
}
