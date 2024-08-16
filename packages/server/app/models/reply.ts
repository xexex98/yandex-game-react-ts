import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  AllowNull,
  AfterCreate,
  AfterUpdate,
} from 'sequelize-typescript'
import { Comment } from './comment'

interface IReply {
  value: string
  idUser: number
  commentId?: number
  replyId?: number
}

@Table
export class Reply extends Model<Reply, IReply> {
  @AllowNull(false)
  @Column(DataType.STRING)
  value!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  idUser!: number

  @Column(DataType.INTEGER)
  @ForeignKey(() => Comment)
  commentId!: number

  @BelongsTo(() => Comment)
  comment!: Comment

  @Column(DataType.INTEGER)
  replyId!: number

  @HasMany(() => Reply, { foreignKey: 'replyId', as: 'subReply' })
  subReply?: Reply[]

  @AfterCreate
  @AfterUpdate
  static async validateSelfReference(instance: Reply) {
    if (instance.replyId && instance.replyId === instance.id) {
      await Reply.destroy({ where: { id: instance.id } })
      throw new Error('ID and parentId cannot be the same.')
    }
  }
}
