import { Product } from '../../domain/entities/product'
import { ProductRepositoryInterface } from '../../domain/repositories/product-repository.interfaces'
import { ProductModel } from '../db/sequelize/model/product.model'

export class ProductRepository implements ProductRepositoryInterface {
  async create(entity: Product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }

  async update(entity: Product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: { id: entity.id },
      },
    )
  }

  async find(id: string): Promise<Product> {
    const productModel = await ProductModel.findOne({ where: { id } })
    return new Product(productModel.id, productModel.name, productModel.price)
  }

  async findByName(name: string): Promise<Product> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<Product[]> {
    const productModels = await ProductModel.findAll()
    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price),
    )
  }
}