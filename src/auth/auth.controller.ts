import { Body, Controller, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/schema/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  signUp(@Body() user: User): Promise<void> {
    return this.authService.register(user);
  }

  @Post('/login')
  signIn(@Body() user: User): Promise<{ accessToken: string, userId: string }> {
    return this.authService.login(user);
  }
}
