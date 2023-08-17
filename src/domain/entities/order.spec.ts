import Order from './order'
import { OrderItem } from './order_item'

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => {
      const order = new Order('', '123', [])
    }).toThrow('Id is required')
  })
  it('should throw error when customerId is empty', () => {
    expect(() => {
      const order = new Order('123', '', [])
    }).toThrow('CustomerId is required')
  })

  it('should throw error when item is empty', () => {
    expect(() => {
      const order = new Order('123', '123', [])
    }).toThrow('Items are required')
  })

  it('should calculate total', () => {
    const item = new OrderItem('1', 'Item 1', 10, 'p1', 2)
    const item1 = new OrderItem('2', 'Item 2', 10, 'p2', 2)

    const order = new Order('123', '123', [item])
    let total = order.total()
    expect(total).toBe(20)
    const order2 = new Order('123', '123', [item, item1])
    total = order2.total()
    expect(total).toBe(40)
  })
  it('should throw error if the item qtd is less or equal zero', () => {
    expect(() => {
      const item = new OrderItem('1', 'Item 1', 10, 'p1', 0)
      const order = new Order('123', '123', [item])
    }).toThrow('Quantity must be greater than 0')
  })
})
