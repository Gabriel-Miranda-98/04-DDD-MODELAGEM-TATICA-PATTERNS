import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../db/sequelize/model/product.model'
import { ProductRepository } from './product.repository'
import { Product } from '../../domain/product/entities/product'

describe('Product Repository tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })
  afterEach(async () => {
    sequelize.close()
  })

  it('should create a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product 1', 10)
    await productRepository.create(product)
    const productModel = await ProductModel.findOne({ where: { id: 'p1' } })
    expect(productModel.toJSON()).toStrictEqual({
      id: 'p1',
      name: 'Product 1',
      price: 10,
    })
  })

  it('should update a product', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product 1', 10)
    await productRepository.create(product)
    const productModel = await ProductModel.findOne({ where: { id: 'p1' } })
    expect(productModel.toJSON()).toStrictEqual({
      id: 'p1',
      name: 'Product 1',
      price: 10,
    })
    product.changeName('Product 2')
    product.changePrice(20)
    await productRepository.update(product)
    const productModelUpdated = await ProductModel.findOne({
      where: { id: 'p1' },
    })

    expect(productModelUpdated.toJSON()).toStrictEqual({
      id: 'p1',
      name: 'Product 2',
      price: 20,
    })
  })

  it('should find a product by id', async () => {
    const productRepository = new ProductRepository()
    const product = new Product('p1', 'Product 1', 10)
    await productRepository.create(product)
    const productModel = await ProductModel.findOne({ where: { id: 'p1' } })
    const productFound = await productRepository.find(productModel.id)
    expect(productModel.toJSON()).toStrictEqual({
      id: productFound.id,
      name: productFound.name,
      price: productFound.price,
    })
  })

  it('should find all products', async () => {
    const productRepository = new ProductRepository()
    const product1 = new Product('p1', 'Product 1', 10)
    await productRepository.create(product1)
    const product2 = new Product('p2', 'Product 2', 20)
    await productRepository.create(product2)
    const product3 = new Product('p3', 'Product 3', 30)
    await productRepository.create(product3)
    const foundProducts = await productRepository.findAll()
    const products = [product1, product2, product3]
    expect(products).toEqual(foundProducts)
  })
})
