import { Customer } from '../../customer/entities/customer'
import Order from '../entities/order'
import { OrderItem } from '../entities/order_item'
import { OrderService } from './order.service'

describe('Order Service unit tests', () => {
  it('should place an order', () => {
    const customer = new Customer('c1', 'Customer 1')
    const item1 = new OrderItem('1', 'Item 1', 10, 'p1', 1)
    const order = OrderService.placeOrder(customer, [item1])
    expect(customer.rewardPoints).toBe(5)
    expect(order.total()).toBe(10)
  })

  it('should get total of all orders', () => {
    const item1 = new OrderItem('1', 'Item 1', 100, 'p1', 1)
    const item2 = new OrderItem('2', 'Item 2', 100, 'p2', 2)

    const order = new Order('order 1', 'c1', [item1])
    const order2 = new Order('order 2', 'c1', [item2])

    const total = OrderService.total([order, order2])
    expect(total).toBe(300)
  })
})
