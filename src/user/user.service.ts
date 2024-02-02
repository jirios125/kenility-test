import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import * as bcrypt from 'bcrypt';
import { User } from './user.schema';
import { UserDto } from './dto/user.dto';
import { UserResponse } from './dto/user.response';
import { sign } from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userModel.findOne({ username }).exec();
  }

  async createUser(userDto: UserDto): Promise<User> {
    const { username, password } = userDto;

    const existingUser = await this.findOne(username);
    if (existingUser) {
      throw new ConflictException('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 10);

    const newUser = new this.userModel({
      username,
      hashedPassword,
    });

    return newUser.save();
  }

  async loginUser(userDto: UserDto): Promise<User> {
    const user = await this.userModel
      .findOne({ username: userDto.username })
      .select('+password');

    if (!user) {
      throw new HttpException(
        'User not found',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(userDto.password, user.password);

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Incorrect password',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    return user;
  }

  buildResponse(user: User): UserResponse {
    return { username: user.username, token: this.generateJwt(user) };
  }

  generateJwt(user: User): string {
    return sign({ username: user.username }, process.env.JWT_SECRET);
  }
}
