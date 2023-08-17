import { Column, Model, Table, DataType } from 'sequelize-typescript'
@Table({
  tableName: 'products',
  timestamps: false,
})
export class ProductModel extends Model {
  @Column({ primaryKey: true, type: DataType.STRING })
  declare id: string

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
