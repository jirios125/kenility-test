import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { ProductDto } from './dto/product.dto';
import { ApiTags } from '@nestjs/swagger';
import {OrderDto} from "../order/dto/order.dto";
import {Order} from "../order/order.schema";
import {OrderService} from "../order/order.service";

@ApiTags('Products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService, private orderService: OrderService) {}

  @Get()
  async getAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Post()
  async createProduct(
    @Body()
    product: ProductDto,
  ): Promise<Product> {
    return this.productService.create(product);
  }

  @Post("req")
  async requestProduct(
      @Body()
          order: OrderDto,
  ): Promise<Order> {
    return this.orderService.createOrder(order);
  }

  @Put(':id')
  async updateProduct(
    @Param('id')
    id: string,
    @Body()
    product: ProductDto,
  ): Promise<Product> {
    return this.productService.updateById(id, product);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id')
    id: string,
  ): Promise<Product> {
    return this.productService.deleteById(id);
  }
}
