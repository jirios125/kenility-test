import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { ManagementModule } from './management/management.module';

@Module({
  imports: [AuthModule, ProductModule, OrderModule, ManagementModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
