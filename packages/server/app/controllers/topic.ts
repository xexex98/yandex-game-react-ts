import { User } from '../decorators/types'
import { Auth } from '../decorators/CheckAuth'
import { TopicDTO } from '../dto/topic'
import { Request, Response } from 'express'
import TopicService from '../service/topic'

class TopicController {
  user?: User

  @Auth
  async create(
    req: Request<object, object, Omit<TopicDTO, 'idUser'>>,
    res: Response
  ) {
    try {
      const data = req.body
      if (this.user) {
        await TopicService.create({ idUser: this.user.id, ...data })
        res.status(201).send()
      }
    } catch (e) {
      res.status(400).send()
    }
  }

  @Auth
  async findAll(_req: Request, res: Response) {
    try {
      const topics = await TopicService.getAll()
      res.send(topics)
    } catch (e) {
      console.log(e)
    }
  }
}

export const Topic = new TopicController()
