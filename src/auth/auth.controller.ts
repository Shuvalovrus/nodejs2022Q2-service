import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthUserDto } from './dto/auth-user.dto';
import { Public } from './jwt-auth.guard';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authServices: AuthService) {}

  @Public()
  @Post('signup')
  signup(@Body() signupUserDto: AuthUserDto) {
    return this.authServices.signUp(signupUserDto);
  }

  @Public()
  @Post('login')
  login(@Body() loginUserDto: AuthUserDto) {
    return this.authServices.signIn(loginUserDto);
  }

  @Post('refresh')
  refresh(@Body() body) {
    return this.authServices.refresh(body);
  }
}
