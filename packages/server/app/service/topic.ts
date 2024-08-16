import { TopicDTO } from '../dto/topic'
import { Topic } from '../models/topic'
import { Comment } from '../models/comment'

class TopicService {
  async create(data: TopicDTO) {
    await Topic.create(data)
  }

  async getAll() {
    const t = await Topic.findAll({
      include: [
        {
          model: Comment,
        },
      ],
    })
    console.log(t)
    return t
  }
}

export default new TopicService()
