import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Product{
    @Prop()
    name: string;

    @Prop()
    SKU: string;

    @Prop()
    img: string;

    @Prop()
    price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product)