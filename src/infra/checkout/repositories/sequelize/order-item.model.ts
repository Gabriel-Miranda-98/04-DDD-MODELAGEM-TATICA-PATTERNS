import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript'
import { ProductModel } from '../../../product/repositories/sequelize/product.model'
import { OrderModel } from './order.mode.'

@Table({ tableName: 'order_items', timestamps: false })
export class OrderItemModel extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  declare id: string

  @ForeignKey(() => ProductModel)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare product_id: string

  @BelongsTo(() => ProductModel)
  declare product: ProductModel

  @ForeignKey(() => OrderModel)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare order_id: string

  @BelongsTo(() => OrderModel)
  declare order: OrderModel

  @Column({
    allowNull: false,
    type: DataType.NUMBER,
  })
  declare quantity: number

  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare name: string

  @Column({
    allowNull: false,
    type: DataType.NUMBER,
  })
  declare price: number
}
