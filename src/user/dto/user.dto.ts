import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({
    description: 'The username',
    type: String,
    default: 'juan',
  })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({
    description: 'The password',
    type: String,
    default: 'juan123',
  })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
