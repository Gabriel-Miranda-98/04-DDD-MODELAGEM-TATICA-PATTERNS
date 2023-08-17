import { Model, Column, DataType, Table } from 'sequelize-typescript'

@Table({
  tableName: 'customers',
  timestamps: false,
})
export class CustomerModel extends Model {
  @Column({
    primaryKey: true,
    type: DataType.STRING,
  })
  declare id: string

  @Column({ allowNull: true, type: DataType.STRING })
  declare name: string

  @Column({ allowNull: true, type: DataType.STRING })
  declare street: string

  @Column({ allowNull: true, type: DataType.NUMBER })
  declare number: number

  @Column({ allowNull: true, type: DataType.STRING })
  declare zipCode: string

  @Column({ allowNull: true, type: DataType.STRING })
  declare city: string

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  declare active: boolean

  @Column({ allowNull: true, type: DataType.NUMBER })
  declare rewardPoints: number
}
