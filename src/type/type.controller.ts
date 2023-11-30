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

import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { TypeService } from './type.service';

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
  @ApiOperation({
    summary: 'Create new type',
  })
  create(@Body() dto: CreateTypeDto) {
    return this.typeService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete type by id',
  })
  delete(@Param('id') id: string) {
    return this.typeService.delete(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Updating type by id',
  })
  update(@Param('id') id: string, @Body() dto: UpdateTypeDto) {
    return this.typeService.update(id, dto);
  }
}
