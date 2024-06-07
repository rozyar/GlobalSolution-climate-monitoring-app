import { Body, Controller, Post } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post('register')
  async register(
    @Body() data: { email: string; password: string; name: string },
  ) {
    return this.UserService.create(data);
  }
}
