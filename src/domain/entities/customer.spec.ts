import { Address } from './address'
import { Customer } from './customer'

describe('Customer unit test', () => {
  it('should throw erro when id is empty', () => {
    expect(() => {
      const customer = new Customer('', 'jhon')
    }).toThrow('Id is required')
  })
  it('should throw erro when name is empty', () => {
    expect(() => {
      const customer = new Customer('123', '')
    }).toThrow('Name is required')
  })
  it('should change name', () => {
    const customer = new Customer('123', 'jhon')
    customer.changeName('Jane')
    expect(customer.name).toBe('Jane')
  })

  it('should activate costumer', () => {
    const customer = new Customer('1', 'Costumer')
    const address = new Address(
      'Street Address',
      123,
      '3028738',
      'Minas Gerais',
    )
    customer.changeAddress(address)
    customer.activate()
    expect(customer.isActive()).toBe(true)
  })

  it('should deactivate costumer', () => {
    const customer = new Customer('1', 'Costumer')
    customer.deactivate()
    expect(customer.isActive()).toBe(false)
  })
  it('should throw error when address is undefined when you activate a costumer', () => {
    expect(() => {
      const customer = new Customer('1', 'Costumer')
      customer.activate()
    }).toThrow('Address is mandatory to activate a customer')
  })

  it('should add reward points', () => {
    const customer = new Customer('1', 'Costumer')
    expect(customer.rewardPoints).toBe(0)
    customer.addRewardPoints(100)
    expect(customer.rewardPoints).toBe(100)
    customer.addRewardPoints(10)
    expect(customer.rewardPoints).toBe(110)
  })
})
