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
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypeService } from './type.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('type')
@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all types',
  })
  getAll() {
    return this.typeService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get type by id',
  })
  getById(@Param('id') id: string) {
    return this.typeService.findById(id);
  }

  @Post()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Create new type',
  })
  create(@Body() dto: CreateTypeDto) {
    return this.typeService.create(dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Delete type by id',
  })
  delete(@Param('id') id: string) {
    return this.typeService.delete(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Updating type by id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto) {
    return this.typeService.update(id, dto);
  }
}
