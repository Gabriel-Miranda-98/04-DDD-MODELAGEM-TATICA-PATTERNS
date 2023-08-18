import Order from '../entities/order'
import { OrderItem } from '../entities/order_item'

interface OrderProps {
  id: string
  costumerId: string
  items: {
    id: string
    name: string
    productId: string
    quantity: number
    price: number
  }[]
}

export class OrderFactory {
  static create(orderProps: OrderProps) {
    const orderItems = orderProps.items.map(
      (item) =>
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.productId,
          item.quantity,
        ),
    )

    return new Order(orderProps.id, orderProps.costumerId, orderItems)
  }
}
