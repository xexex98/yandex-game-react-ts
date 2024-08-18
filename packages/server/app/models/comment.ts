import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
  AllowNull,
} from 'sequelize-typescript'
import { Topic } from './topic'
import { Reply } from './reply'

interface IComment {
  value: string
  topicId: number
  idUser: number
  reply: Reply[] | undefined
}

@Table
export class Comment extends Model<Comment, IComment> {
  @AllowNull(false)
  @Column(DataType.STRING)
  value!: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  idUser!: number
  
  @AllowNull(false)
  @ForeignKey(() => Topic)
  @Column(DataType.INTEGER)
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic

  @HasMany(() => Reply)
  reply!: Reply[]
}
