import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserResponse } from './dto/user.response';
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(@Body() userDto: UserDto): Promise<UserResponse> {
    const user = await this.userService.createUser(userDto);
    return this.userService.buildResponse(user);
  }

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<UserResponse> {
    const user = await this.userService.loginUser(userDto);
    return this.userService.buildResponse(user);
  }
}
