import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { ProductDto } from './dto/product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderDto } from '../order/dto/order.dto';
import { Order } from '../order/order.schema';
import { OrderService } from '../order/order.service';
import { ExpressRequest } from '../user/middleware/auth.middleware';

@ApiTags('Products')
@Controller('product')
@ApiBearerAuth()
export class ProductController {
  constructor(
    private productService: ProductService,
    private orderService: OrderService,
  ) {}

  @Get()
  async getAll(@Request() request: ExpressRequest): Promise<Product[]> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.productService.findAll();
  }

  @Post()
  async createProduct(
    @Request() request: ExpressRequest,
    @Body()
    product: ProductDto,
  ): Promise<Product> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.productService.create(product);
  }

  @Post('req')
  async requestProduct(
    @Request() request: ExpressRequest,
    @Body()
    order: OrderDto,
  ): Promise<Order> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.orderService.createOrder(order);
  }

  @Put(':id')
  async updateProduct(
    @Request() request: ExpressRequest,
    @Param('id')
    id: string,
    @Body()
    product: ProductDto,
  ): Promise<Product> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.productService.updateById(id, product);
  }

  @Delete(':id')
  async deleteProduct(
    @Request() request: ExpressRequest,
    @Param('id')
    id: string,
  ): Promise<Product> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.productService.deleteById(id);
  }
}
