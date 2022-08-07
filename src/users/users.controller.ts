import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UsersController {
  constructor(private readonly usersServices: UsersService) {}

  @Get()
  getUsers(): Promise<
    {
      createdAt: number;
      id: string;
      login: string;
      version: number;
      updatedAt: number;
    }[]
  > {
    return this.usersServices.getAll();
  }

  @Get(':id')
  getUser(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<{
    createdAt: number;
    id: string;
    login: string;
    version: number;
    updatedAt: number;
  }> {
    return this.usersServices.getOne(id);
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<{
    createdAt: number;
    id: string;
    login: string;
    version: number;
    updatedAt: number;
  }> {
    return this.usersServices.create(createUserDto);
  }

  @Put(':id')
  updateUser(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ): Promise<{
    createdAt: number;
    id: string;
    login: string;
    version: number;
    updatedAt: number;
  }> {
    return this.usersServices.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(204)
  deleteUser(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.usersServices.delete(id);
  }
}
