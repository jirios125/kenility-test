import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Product{
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    SKU: string;

    @Prop({ required: true })
    img: string;

    @Prop({ required: true })
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)