import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Order } from './order.schema';
import { OrderDto } from './dto/order.dto';
import { ProductService } from '../product/product.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: mongoose.Model<Order>,
    private productService: ProductService,
  ) {}

  async findAll(): Promise<Order[]> {
    return this.orderModel.find();
  }

  async findById(id: string): Promise<Order> {
    return this.orderModel.findById(id);
  }

  async createOrder(orderData: OrderDto) {
    const productInfoPromises = orderData.productList.map(async (product) => {
      const productId = product.productId;
      const quantity = product.quantity;

      const productInfo = await this.productService.findById(productId);

      return { productInfo, quantity };
    });

    const productInfoAndQuantities = await Promise.all(productInfoPromises);

    orderData.total = productInfoAndQuantities.reduce(
      (total, { productInfo, quantity }) =>
        total + (productInfo?.price ?? 0) * quantity,
      0,
    );

    return await this.orderModel.create(orderData);
  }

  async updateById(id: string, order: Order): Promise<Order> {
    return this.orderModel.findByIdAndUpdate(id, order, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Order> {
    return this.orderModel.findByIdAndDelete(id);
  }
}
