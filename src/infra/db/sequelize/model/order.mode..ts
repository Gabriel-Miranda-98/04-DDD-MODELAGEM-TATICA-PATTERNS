import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript'
import { CustomerModel } from './customer.mode'
import { OrderItemModel } from './order-item.model'

@Table({ tableName: 'orders', timestamps: false })
export class OrderModel extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  declare id: string

  @ForeignKey(() => CustomerModel)
  @Column({
    allowNull: false,
    type: DataType.STRING,
  })
  declare customer_id: string

  @BelongsTo(() => CustomerModel)
  declare costumer: CustomerModel

  @HasMany(() => OrderItemModel)
  declare items: OrderItemModel[]

  @Column({
    allowNull: false,
    type: DataType.NUMBER,
  })
  declare total: number
}
