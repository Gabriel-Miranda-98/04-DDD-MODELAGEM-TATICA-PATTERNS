import { Product } from '../entities/product'
import { ProductInterface } from '../entities/product.interface'
import { randomUUID } from 'node:crypto'
export class ProductFactory {
  static create(name: string, price: number): ProductInterface {
    return new Product(randomUUID(), name, price)
  }
}
