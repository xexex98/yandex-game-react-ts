import { Comment } from '../models/comment'

export type CommentDTO = {
  value: string
  topicId: number
  idUser: number
}

export type CommentReply = {
  id: number
  value: string
  idUser: number
  replyId?: number
  createdAt:Date
}
