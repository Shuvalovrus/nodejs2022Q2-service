import * as bcrypt from 'bcrypt';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entity/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import 'dotenv/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signupUserDto: CreateUserDto) {
    const user = await this.userService.create(signupUserDto);

    const tokens = await this.getJwt(user);

    await this.updateRt(user.id, tokens.refreshToken);

    return 'User has been created';
  }

  async signIn(loginUserDto: AuthUserDto) {
    const user = await this.userRepo.findOne({
      where: { login: loginUserDto.login },
    });

    if (user) {
      const password = user.password;
      const isMatch = await bcrypt.compare(loginUserDto.password, password);

      if (isMatch) return this.getJwt(user);
    }

    throw new ForbiddenException('Authentication failed');
  }

  async refresh(body) {
    const refreshToken = body.refreshToken;

    if (!refreshToken) throw new UnauthorizedException('No refresh token');

    try {
      const verifyToken = await this.jwtService.verify(refreshToken, {
        secret: process.env.RT_JWT_SECRET as string,
      });

      const userPayload = { login: verifyToken.username, id: verifyToken.sub };

      const tokens = await this.getJwt(userPayload);

      await this.updateRt(verifyToken.sub, tokens.refreshToken);

      return tokens;
    } catch (err) {
      throw new ForbiddenException('Incorrect token');
    }
  }

  async getJwt(user) {
    const payload = { username: user.login, sub: user.id };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET as string,
        expiresIn: process.env.JWT_SECRET_TIME as string,
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.RT_JWT_SECRET as string,
        expiresIn: process.env.RT_JWT_SECRET_TIME as string,
      }),
    };
  }

  async updateRt(userId, rt) {
    const saltOrRounds = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(rt, saltOrRounds);

    await this.userRepo.update(userId, {
      refreshToken: hash,
    });
  }
}
