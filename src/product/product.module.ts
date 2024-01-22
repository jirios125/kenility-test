import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from '../order/order.service';
import { OrderSchema } from '../order/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
  ],
  providers: [ProductService, OrderService],
  controllers: [ProductController],
})
export class ProductModule {}
