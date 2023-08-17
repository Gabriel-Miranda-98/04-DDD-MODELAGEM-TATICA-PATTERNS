import { Sequelize } from 'sequelize-typescript'
import { Address } from '../../../../domain/customer/value-object/address'
import { CustomerModel } from './customer.mode'
import { CustomerRepository } from './customer.repository'
import { Customer } from '../../../../domain/customer/entities/customer'

describe('Customer Repository tests', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })
  afterEach(async () => {
    sequelize.close()
  })

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('c1', 'John Doe')
    const address = new Address('rua 1', 1, '12345678', 'cidade 1')
    customer.changeAddress(address)
    customer.activate()
    await customerRepository.create(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: 'c1' } })

    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: address.street,
      number: address.number,
      city: address.city,
      zipCode: address.zipCode,
      rewardPoints: customer.rewardPoints,
    })
  })

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository()

    const customer = new Customer('c1', 'John Doe')
    const address = new Address('rua 1', 1, '12345678', 'cidade 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)
    customer.changeName('John Doe 2')
    await customerRepository.update(customer)
    const customerModel = await CustomerModel.findOne({ where: { id: 'c1' } })
    expect(customerModel.toJSON()).toStrictEqual({
      id: customer.id,
      name: customer.name,
      active: customer.isActive(),
      street: address.street,
      number: address.number,
      city: address.city,
      zipCode: address.zipCode,
      rewardPoints: customer.rewardPoints,
    })
  })

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('c1', 'John Doe')
    const address = new Address('rua 1', 1, '12345678', 'cidade 1')

    customer.changeAddress(address)
    await customerRepository.create(customer)
    const customerResult = await customerRepository.find(customer.id)
    expect(customer).toStrictEqual(customerResult)
  })

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository()
    await expect(customerRepository.find('c1')).rejects.toThrow(
      'Customer not found',
    )
  })

  it('should be able to find all customers', async () => {
    const customerRepository = new CustomerRepository()
    const costumer1 = new Customer('c1', 'John Doe')
    const address1 = new Address('rua 1', 1, '12345678', 'cidade 1')
    costumer1.changeAddress(address1)
    await customerRepository.create(costumer1)
    const costumer2 = new Customer('c2', 'John Doe 2')
    const address2 = new Address('rua 2', 2, '12345678', 'cidade 2')
    costumer2.changeAddress(address2)
    await customerRepository.create(costumer2)
    const customers = await customerRepository.findAll()
    expect(customers).toHaveLength(2)
    expect(customers).toStrictEqual([costumer1, costumer2])
  })
})
