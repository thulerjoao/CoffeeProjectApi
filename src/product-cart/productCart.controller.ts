import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoggedUser } from 'src/auth/logged-user.decorator';
import { CreateProductCartDto } from './dto/create.productCart.dto';
import { UpdateProductCartDto } from './dto/update.productCart.dto';
import { ProductCartService } from './productCart.service';

@ApiTags('productCart')
@UseGuards(AuthGuard())
@ApiBearerAuth()
@Controller('productCart')
export class ProductCartController {
  constructor(private readonly productCartService: ProductCartService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all productCarts',
  })
  getAll(@LoggedUser() user) {
    const cartId = user.cartId;
    return this.productCartService.findAll(cartId);
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
  create(@LoggedUser() user, @Body() dto: CreateProductCartDto) {
    const cartId = user.cartId;
    return this.productCartService.create(cartId, dto);
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
