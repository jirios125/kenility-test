import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  ArrayMinSize,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty({
    description: 'The ID of the Order',
    type: String,
    default: 'A-0001',
  })
  @IsString()
  @IsNotEmpty()
  identifier: string;

  @ApiProperty({
    description: 'The name of the customer who wants the Order',
    type: String,
    default: 'Vegetable distributor LLC',
  })
  @IsString()
  @IsNotEmpty()
  clientName: string;

  @ApiProperty({
    description:
      'The total amount to pay for the Order. This is auto calculated by the order service',
    type: Number,
  })
  @IsNumber()
  total: number;

  @ApiProperty({
    description: 'The list of products that the order have',
    type: Array,
  })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayNotEmpty()
  @IsObject({ each: true })
  @ValidateNested({ each: true })
  @Type(() => Object)
  productList: { productId: string; quantity: number }[];
}
