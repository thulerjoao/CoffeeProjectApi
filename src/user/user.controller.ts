import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all users',
  })
  getAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get user by id',
  })
  getById(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create new user',
  })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete user by id',
  })
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }

  // @Patch(':id')
  // @ApiOperation({
  //   summary: 'Updating user by id',
  // })
  // update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
  //   return this.userService.update(id, dto);
  // }
}
