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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Order } from './order.schema';
import { OrderDto } from './dto/order.dto';
import { ExpressRequest } from '../user/middleware/auth.middleware';

@ApiTags('Orders')
@Controller('order')
@ApiBearerAuth()
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getAll(@Request() request: ExpressRequest): Promise<Order[]> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.orderService.findAll();
  }

  @Get('/total-sold-lm')
  async getTotalAmountSoldLastMonth(
    @Request() request: ExpressRequest,
  ): Promise<number> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.orderService.getTotalAmountSoldLastMonth();
  }

  @Get('/highest-sale')
  async getHighestSale(@Request() request: ExpressRequest): Promise<number> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return await this.orderService.getHighestSale();
  }

  @Post()
  async createOrder(
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
  async updateOrder(
    @Request() request: ExpressRequest,
    @Param('id')
    id: string,
    @Body()
    order: OrderDto,
  ): Promise<Order> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.orderService.updateById(id, order);
  }

  @Delete(':id')
  async deleteOrder(
    @Request() request: ExpressRequest,
    @Param('id')
    id: string,
  ): Promise<Order> {
    if (!request.user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
    return this.orderService.deleteById(id);
  }
}
