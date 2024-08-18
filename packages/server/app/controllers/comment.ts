import { User } from '../decorators/types'
import { Auth } from '../decorators/CheckAuth'
import { CommentDTO } from '../dto/comment'
import { Request, Response } from 'express'
import CommentService from '../service/comment'
import { transformPagination } from '../utils/validPagintaion'
import { getMessageError } from '../utils/getMessageError'

class CommentController {
  user?: User

  @Auth
  async create(
    req: Request<object, object, Omit<CommentDTO, 'idUser'>>,
    res: Response,
  ) {
    try {
      const data = req.body
      if (this.user) {
        await CommentService.create({ idUser: this.user.id, ...data })
        res.status(201).send()
      }
    } catch (e) {
      res.status(400).send(getMessageError(e))
    }
  }

  @Auth
  async findAll(req: Request, res: Response) {
    try {
      const { topicId, page, limit } = req.query
      if (!topicId) {
        throw new Error('Отсутствует поле topicId')
      }
      const topics = await CommentService.getCommentByTopic(
        Number(topicId),
        transformPagination(page, limit),
      )
      res.send(topics)
    } catch (e) {
      res.status(400).send(getMessageError(e))
    }
  }
}

export const Comment = new CommentController()
