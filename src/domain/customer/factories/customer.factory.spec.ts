import { Address } from '../value-object/address'
import { CustomerFactory } from './customer.factory'

describe('Customer factory unit test', () => {
  it('should create a new customer', () => {
    const customer = CustomerFactory.create('Customer A')
    expect(customer.name).toBe('Customer A')
    expect(customer.id).toBeDefined()
    expect(customer.constructor.name).toBe('Customer')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with address', () => {
    const address = new Address('Street A', 123, '12345-123', 'City A')
    const costumer = CustomerFactory.createWithAddress('Customer A', address)
    expect(costumer.name).toBe('Customer A')
    expect(costumer.id).toBeDefined()
    expect(costumer.constructor.name).toBe('Customer')
    expect(costumer.address).toBe(address)
  })
})
