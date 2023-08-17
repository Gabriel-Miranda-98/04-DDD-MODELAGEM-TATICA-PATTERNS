import Order from '../entities/order'
import { RepositoryInterface } from '../../repositories/repository-interface'
export interface OrderRepositoryInterface extends RepositoryInterface<Order> {
  findByDate(date: Date): Promise<Order>
}
