import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from './entity/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  getUsers(): Array<UserEntity> {
    return this.usersServices.getAll();
  }

  @Get(':id')
  getUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): UserEntity {
    return this.usersServices.getOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserEntity {
    return this.usersServices.create(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): UserEntity {
    return this.usersServices.update(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersServices.delete(id);
  }
}
