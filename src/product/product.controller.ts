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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';
import { ProductDto } from './dto/product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderDto } from '../order/dto/order.dto';
import { Order } from '../order/order.schema';
import { OrderService } from '../order/order.service';
import { ExpressRequest } from '../user/middleware/auth.middleware';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

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
  @UseInterceptors(FileInterceptor('file'))
  async createProduct(
    @Request() request: ExpressRequest,
    @UploadedFile() file,
    @Body()
    product: ProductDto,
  ): Promise<Product> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (file) {
      product.img = this.convertFileToBase64(file);
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
  @UseInterceptors(FileInterceptor('file'))
  async updateProduct(
    @Request() request: ExpressRequest,
    @UploadedFile() file,
    @Param('id')
    id: string,
    @Body()
    product: ProductDto,
  ): Promise<Product> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    if (file) {
      product.img = this.convertFileToBase64(file);
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

  private convertFileToBase64(file): string {
    const fileBuffer = fs.readFileSync(file.path);
    const base64String = fileBuffer.toString('base64');
    fs.unlinkSync(file.path);
    return base64String;
  }
}
