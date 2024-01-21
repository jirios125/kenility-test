import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Order {
  @Prop({ required: true, unique: true })
  identifier: string;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  total: number;

  @Prop({ type: [{ productId: String, quantity: Number }] })
  productList: { productId: string; quantity: number }[];
}

export const OrderSchema = SchemaFactory.createForClass(Order);
