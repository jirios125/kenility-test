import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @ApiProperty({
    description: 'The name of the Product',
    type: String,
    default: 'Apple',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The reference name of the Product',
    type: String,
    default: '480-008',
  })
  @IsString()
  @IsNotEmpty()
  readonly SKU: string;

  @ApiProperty({
    description: 'The img of the Product in base64',
    type: String,
    default:
      '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',
  })
  @IsString()
  @IsNotEmpty()
  readonly img: string;

  @ApiProperty({
    description: 'The price of the Product',
    type: Number,
    minimum: 1,
    default: 100,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly price: number;
}
