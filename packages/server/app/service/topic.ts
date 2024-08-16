import { TopicDTO } from '../dto/topic'
import { Topic } from '../models/topic'
import { Pagination } from '../types/Pagination'

class TopicService {
  async create(data: TopicDTO) {
    try {
      await Topic.create(data)
    } catch (e) {
      console.error(e)
      throw new Error('Ошибка создания topic')
    }
  }

  async getAll(pagination?: Pagination) {
    try {
      if (pagination) {
        const { limit, page } = pagination
        const topics = await Topic.findAndCountAll({
          offset: limit * (page - 1),
          limit: limit,
        })
        return {
          rows: topics.rows,
          page: page,
          totalPage: Math.ceil(topics.count / limit),
        }
      }
      return await Topic.findAll()
    } catch (e) {
      console.error(e)
      throw new Error('Ошибка получения topic')
    }
  }
}

export default new TopicService()
