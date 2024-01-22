import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductSchema } from './product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderService } from '../order/order.service';
import { OrderSchema } from '../order/order.schema';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Order', schema: OrderSchema },
    ]),
    MulterModule.register({ dest: './uploads' }),
  ],
  providers: [ProductService, OrderService],
  controllers: [ProductController],
})
export class ProductModule {}
