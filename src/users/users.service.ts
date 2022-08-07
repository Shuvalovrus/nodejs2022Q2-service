import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async getAll() {
    const users = await this.userRepo.find();

    return users.map((user) => user.toResponse());
  }

  async getOne(userId: string) {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new NotFoundException('User not found');

    return user.toResponse();
  }

  async delete(userId) {
    const deletedUser = await this.getOne(userId);

    if (deletedUser) return await this.userRepo.delete(userId);
  }

  async update(userId, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepo.findOne({ where: { id: userId } });

    if (!updatedUser) throw new NotFoundException('User not found');

    if (updatedUser.password !== updateUserDto.oldPassword)
      throw new ForbiddenException();

    await this.userRepo.update(userId, {
      password: updateUserDto.newPassword,
    });

    return await this.getOne(userId);
  }

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = this.userRepo.create({
      login: createUserDto.login,
      password: hashPassword,
    });

    return (await this.userRepo.save(createdUser)).toResponse();
  }
}
