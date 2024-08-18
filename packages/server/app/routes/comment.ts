import { Router } from 'express'
import { Comment } from '../controllers/comment'

export default () => {
  const router = Router()

  router.post('/', Comment.create)
  router.get('/', Comment.findAll)

  return router
}
