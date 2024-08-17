import { User } from '../decorators/types'
import { Auth } from '../decorators/CheckAuth'
import { Request, Response } from 'express'
import { ReplyFromCommentDTO, ReplyFromReplyDTO } from '../dto/reply'
import ReplyService from '../service/reply'
import { getMessageError } from '../utils/getMessageError'

class ReplyController {
  user?: User

  @Auth
  async createFromComment(
    req: Request<object, object, ReplyFromCommentDTO>,
    res: Response,
  ) {
    try {
      if (this.user) {
        const data = req.body
        if (!data.commentId) {
          throw new Error('Отсутствует поле commentId')
        }
        await ReplyService.createFromComment({
          value: data.value,
          commentId: data.commentId,
          idUser: this.user.id,
        })
        res.status(201).send()
      }
    } catch (e) {
      res.status(400).send(getMessageError(e))
    }
  }

  @Auth
  async createFromReply(
    req: Request<object, object, ReplyFromReplyDTO>,
    res: Response,
  ) {
    try {
      const data = req.body
      if (!data.replyId) {
        throw new Error('Отсутствует поле replyId')
      }
      if (this.user) {
        await ReplyService.createFromReply({
          value: data.value,
          replyId: data.replyId,
          idUser: this.user.id,
        })
        res.status(201).send()
      }
    } catch (e) {
      res.status(400).send(getMessageError(e))
    }
  }
}

export const Reply = new ReplyController()
