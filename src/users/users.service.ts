import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];

  getAll(): Array<UserEntity> {
    return this.users;
  }

  getOne(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException();
    return user;
  }

  create(createUserDto: CreateUserDto): UserEntity {
    const newUser = new UserEntity({
      id: uuidv4(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.users.push(newUser);

    return newUser;
  }

  update(id, updateUserDto: UpdateUserDto): UserEntity {
    const updatedUser = this.users.find((user) => user.id === id);

    if (!updatedUser) throw new NotFoundException();
    if (updatedUser.password !== updateUserDto.oldPassword)
      throw new ForbiddenException();

    updatedUser.version++;
    updatedUser.password = updateUserDto.newPassword;
    updatedUser.updatedAt = Date.now();

    return updatedUser;
  }

  delete(id): UserEntity {
    const index = this.users.findIndex((user) => user.id === id);

    if (index === -1) throw new NotFoundException();

    return this.users.splice(index, 1)[0];
  }
}
