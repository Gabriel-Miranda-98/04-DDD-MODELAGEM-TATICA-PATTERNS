import { randomUUID } from 'node:crypto'
import { Customer } from '../entities/customer'
import { Address } from '../value-object/address'
export class CustomerFactory {
  static create(name: string) {
    return new Customer(randomUUID(), name)
  }

  static createWithAddress(name: string, address: Address) {
    const customer = new Customer(randomUUID(), name)
    customer.changeAddress(address)
    return customer
  }
}
