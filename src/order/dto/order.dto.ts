import { IsString, IsNotEmpty, IsNumber, IsArray, ArrayNotEmpty, ArrayMinSize, IsObject, ValidateNested } from 'class-validator';
import {ProductDto} from "../../product/dto/product.dto";
import { Type } from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class OrderDto {
    @ApiProperty({
        description: 'The ID of the Order',
        type: String,
        default: "A-0001",
    })
    @IsString()
    @IsNotEmpty()
    identifier: string;

    @ApiProperty({
        description: 'The name of the customer who wants the Order',
        type: String,
        default: "Vegetable distributor LLC",
    })
    @IsString()
    @IsNotEmpty()
    clientName: string;

    @ApiProperty({
        description: 'The total amount to pay for the Order',
        type: Number,
        default: 10000,
        minimum: 1,
    })
    @IsNumber()
    @IsNotEmpty()
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
    @Type(() => ProductDto)
    productList: ProductDto[];
}