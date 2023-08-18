import { ProductFactory } from './product.factory'

describe('Product factory unit test', () => {
  it('should create a product type a', () => {
    const product = ProductFactory.create('Product A', 10)
    expect(product.name).toBe('Product A')
    expect(product.price).toBe(10)
    expect(product.id).toBeDefined()
    expect(product.constructor.name).toBe('Product')
  })
})
