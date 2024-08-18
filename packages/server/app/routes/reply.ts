import { Router } from 'express'
import { Reply } from '../controllers/reply'

export default () => {
  const router = Router()

  router.post('/comment', Reply.createFromComment)
  router.post('/reply', Reply.createFromReply)

  return router
}
