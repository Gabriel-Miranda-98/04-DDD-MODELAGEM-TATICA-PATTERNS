import { randomUUID } from 'node:crypto'
import { OrderFactory } from './order.factory'

describe('Order factory unit test', () => {
  it('should create an order', () => {
    const orderProps = {
      id: randomUUID(),
      costumerId: randomUUID(),
      items: [
        {
          id: randomUUID(),
          name: 'Product A',
          productId: randomUUID(),
          quantity: 1,
          price: 100,
        },
      ],
    }
    const order = OrderFactory.create(orderProps)
    expect(order.id).toBe(orderProps.id)
    expect(order.customerId).toBe(orderProps.costumerId)
    expect(order.items.length).toBe(1)
    expect(order.constructor.name).toBe('Order')
  })
})
