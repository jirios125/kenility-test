import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.schema';
import { ProductService } from '../product/product.service';
import { ProductSchema } from '../product/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Order', schema: OrderSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  providers: [OrderService, ProductService],
  controllers: [OrderController],
})
export class OrderModule {}
