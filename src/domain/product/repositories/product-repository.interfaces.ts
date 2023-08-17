import { Product } from '../entities/product'
import { RepositoryInterface } from '../../repositories/repository-interface'

export interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {
  findByName(name: string): Promise<Product>
}
