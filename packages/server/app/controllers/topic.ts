import { User } from '../decorators/types'
import { Auth } from '../decorators/CheckAuth'
import { TopicDTO } from '../dto/topic'
import { Request, Response } from 'express'
import { transformPagination } from '../utils/validPagintaion'
import TopicService from '../service/topic'
import { getMessageError } from '../utils/getMessageError'

class TopicController {
  user?: User

  @Auth
  async create(
    req: Request<object, object, Omit<TopicDTO, 'idUser'>>,
    res: Response,
  ) {
    try {
      const data = req.body
      if (this.user) {
        await TopicService.create({ idUser: this.user.id, ...data })
        res.status(201).send()
      }
    } catch (e) {
      res.status(400).send(getMessageError(e))
    }
  }

  @Auth
  async findAll(req: Request, res: Response) {
    try {
      const { page, limit } = req.query
      const topics = await TopicService.getAll(transformPagination(page, limit))
      res.send(topics)
    } catch (e) {
      res.status(400).send(getMessageError(e))
    }
  }
}

export const Topic = new TopicController()
