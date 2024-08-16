import { Table, Column, Model, DataType, HasMany, AllowNull } from 'sequelize-typescript'
import { Comment } from './comment'

interface ITopic {
  name: string
  idUser: number
  description: string | undefined
  comment: Comment[] | undefined
}

@Table
export class Topic extends Model<Topic, ITopic> {
  
  @AllowNull(false)
  @Column(DataType.STRING)
  name!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  idUser!: number

  @Column(DataType.STRING)
  description!: string

  @HasMany(() => Comment)
  comment!: Comment[]
}
