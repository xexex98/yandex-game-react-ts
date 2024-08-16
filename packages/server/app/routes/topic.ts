import { Router } from 'express'
import { Topic } from '../controllers/topic'

export default () => {
  const router = Router()

  router.post('/', Topic.create)
  router.get('/', Topic.findAll)

  return router
}
