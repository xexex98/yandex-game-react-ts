import { ReplyFromCommentDTO, ReplyFromReplyDTO } from '../dto/reply'
import { Reply } from '../models/reply'

class ReplyService {
  async createFromComment(data: ReplyFromCommentDTO) {
    try {
      await Reply.create(data)
    } catch (e) {
      console.error(e)
      throw new Error('Ошибка создания Reply')
    }
  }

  async createFromReply(data: ReplyFromReplyDTO) {
    const reply = await Reply.findByPk(data.replyId)
    if (!reply) {
      throw new Error(`Reply с id ${data.replyId} нет`)
    }
    try {
      const newReply = { ...data, commentId: reply.commentId }
      await Reply.create(newReply)
    } catch (e) {
      console.error(e)
      throw new Error('Ошибка создания Reply')
    }
  }
}

export default new ReplyService()
