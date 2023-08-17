import { Customer } from '../../../../domain/customer/entities/customer'
import { CustomerRepositoryInterface } from '../../../../domain/customer/repositories/customer-repository.interfaces'
import { Address } from '../../../../domain/customer/value-object/address'
import { CustomerModel } from './customer.mode'

export class CustomerRepository implements CustomerRepositoryInterface {
  async findByName(name: string): Promise<Customer> {
    throw new Error('Method not implemented.')
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      street: entity.address.street,
      number: entity.address.number,
      city: entity.address.city,
      zipCode: entity.address.zipCode,
      rewardPoints: entity.rewardPoints,
    })
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive(),
        street: entity.address.street,
        number: entity.address.number,
        city: entity.address.city,
        zipCode: entity.address.zipCode,
        rewardPoints: entity.rewardPoints,
      },
      { where: { id: entity.id } },
    )
  }

  async find(id: string): Promise<Customer> {
    let customerModel

    try {
      customerModel = await CustomerModel.findOne({
        where: { id },
        rejectOnEmpty: true,
      })
    } catch (error) {
      throw new Error('Customer not found')
    }

    const costumer = new Customer(customerModel.id, customerModel.name)
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipCode,
      customerModel.city,
    )
    costumer.changeAddress(address)
    return costumer
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll()
    const customers = customerModels.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name)
      customer.addRewardPoints(customerModel.rewardPoints)
      const address = new Address(
        customerModel.street,
        customerModel.number,
        customerModel.zipCode,
        customerModel.city,
      )
      customer.changeAddress(address)
      if (customerModel.active) customer.activate()
      return customer
    })
    return customers
  }
}
