import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { Order } from './order.schema';
import { OrderDto } from './dto/order.dto';

@ApiTags('Orders')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  async getAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @Post()
  async createOrder(
    @Body()
    order: OrderDto,
  ): Promise<Order> {
    return this.orderService.createOrder(order);
  }

  @Put(':id')
  async updateOrder(
    @Param('id')
    id: string,
    @Body()
    order: OrderDto,
  ): Promise<Order> {
    return this.orderService.updateById(id, order);
  }

  @Delete(':id')
  async deleteOrder(
    @Param('id')
    id: string,
  ): Promise<Order> {
    return this.orderService.deleteById(id);
  }
}
