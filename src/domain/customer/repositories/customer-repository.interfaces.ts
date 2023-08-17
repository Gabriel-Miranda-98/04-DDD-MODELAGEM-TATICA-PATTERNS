import { Customer } from '../entities/customer'
import { RepositoryInterface } from '../../@shared/repositories/repository-interface'

export interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {
  findByName(name: string): Promise<Customer>
}
