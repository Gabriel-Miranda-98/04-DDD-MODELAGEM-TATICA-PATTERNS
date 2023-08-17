import Order from '../../../../domain/checkout/entities/order'
import { OrderItem } from '../../../../domain/checkout/entities/order_item'
import { OrderRepositoryInterface } from '../../../../domain/checkout/repositories/order-repository.interfaces'
import { OrderItemModel } from './order-item.model'
import { OrderModel } from './order.mode.'

export class OrderRepository implements OrderRepositoryInterface {
  findByDate(date: Date): Promise<Order> {
    throw new Error('Method not implemented.')
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { include: [{ model: OrderItemModel }] },
    )
  }

  async update(entity: Order): Promise<void> {
    for await (const item of entity.items) {
      await OrderItemModel.findOrCreate({
        where: { id: item.id },
        defaults: {
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id,
        },
      })
    }

    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      { where: { id: entity.id } },
    )
  }

  find(id: string): Promise<Order> {
    throw new Error('Method not implemented.')
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    })
    const orders = ordersModel.map((orderModel) => {
      const items = orderModel.items.map((item) => {
        const orderItem = new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity,
        )
        return orderItem
      })
      const order = new Order(orderModel.id, orderModel.customer_id, items)
      return order
    })
    return orders
  }
}
