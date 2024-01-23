import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import * as mongoose from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name)
    private productModel: mongoose.Model<Product>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productModel.find();
  }

  async findById(id: string): Promise<Product> {
    return this.productModel.findById(id);
  }

  async create(product: Product): Promise<Product> {
    return await this.productModel.create(product);
  }

  async updateById(id: string, product: Product): Promise<Product> {
    return this.productModel.findByIdAndUpdate(id, product, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id: string): Promise<Product> {
    return this.productModel.findByIdAndDelete(id);
  }
}
