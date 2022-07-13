import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  @Get()
  getUsers() {
    return 'return all users';
  }
  @Get(':id')
  getUser(@Param('id') id: string) {
    return `return user : ${id}`;
  }
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): string {
    return `Login: ${createUserDto.login}, Password: ${createUserDto.password}`;
  }
  @Put(':id')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): string {
    return `id : ${id} New Password: ${updateUserDto.newPassword}, Old Password: ${updateUserDto.oldPassword}`;
  }
  @Delete(':id')
  deleteUser(@Param('id') id: string): string {
    console.log(id);
    return `Delete user: ${id}`;
  }
}
