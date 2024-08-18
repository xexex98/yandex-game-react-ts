import { Router } from 'express'

import Topic from './topic'
import Comment from './comment'
import Reply from './reply'

export const initRouter = () => {
  const router = Router()

  router.use('/topic', Topic())
  router.use('/comment', Comment())
  router.use('/reply', Reply())

  return router
}
