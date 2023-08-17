import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '../db/sequelize/model/customer.mode'
import { OrderModel } from '../db/sequelize/model/order.mode.'
import { OrderItemModel } from '../db/sequelize/model/order-item.model'
import { ProductModel } from '../db/sequelize/model/product.model'
import { CustomerRepository } from './customer.repository'
import { Customer } from '../../domain/entities/customer'
import { Address } from '../../domain/entities/address'
import { ProductRepository } from './product.repository'
import { Product } from '../../domain/entities/product'
import { OrderItem } from '../../domain/entities/order_item'
import Order from '../../domain/entities/order'
import { OrderRepository } from './order.repository'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })
    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })
  afterEach(async () => {
    sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
      ],
    })
  })

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    )

    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const product2 = new Product('p2', 'Product 2', 20)
    await productRepository.create(product2)
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      2,
    )

    order.addItem(orderItem2)

    await orderRepository.update(order)
    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: '123',
      customer_id: '123',
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: '123',
          product_id: '123',
        },
        {
          id: orderItem2.id,
          name: orderItem2.name,
          price: orderItem2.price,
          quantity: orderItem2.quantity,
          order_id: '123',
          product_id: 'p2',
        },
      ],
    })
  })

  it('should be able to find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const productRepository = new ProductRepository()
    const orderRepository = new OrderRepository()

    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const product = new Product('p1', 'Product 1', 10)
    await productRepository.create(product)
    const product2 = new Product('p2', 'Product 1', 10)
    await productRepository.create(product2)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2,
    )
    const orderItem2 = new OrderItem(
      '2',
      product2.name,
      product2.price,
      product2.id,
      2,
    )
    const order = new Order('123', '123', [orderItem, orderItem2])
    await orderRepository.create(order)

    const orderItem3 = new OrderItem(
      '3',
      product.name,
      product.price,
      product.id,
      2,
    )
    const orderItem4 = new OrderItem(
      '4',
      product2.name,
      product2.price,
      product2.id,
      2,
    )
    const order2 = new Order('1234', '123', [orderItem3, orderItem4])

    await orderRepository.create(order2)

    const orders = [order, order2]
    const fundsOrders = await orderRepository.findAll()
    expect(fundsOrders).toEqual(orders)
    expect(fundsOrders.length).toBe(2)
  })
})
