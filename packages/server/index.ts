import dotenv from 'dotenv'
import cors from 'cors'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { initRouter } from './app/routes'

dotenv.config()

import express from 'express'
import { sequelize } from './app/db'

import { Topic } from './app/models/topic'
import { Comment } from './app/models/comment'
import { Reply } from './app/models/reply'

const app = express()

const corsOptions = {
  origin: `http://localhost:${process.env.CLIENT_PORT}`,
  credentials: true,
}

app.use(cors(corsOptions))

const port = Number(process.env.SERVER_PORT)

sequelize.addModels([Topic, Comment, Reply])
sequelize.sync()

app.use('/api', express.urlencoded())
app.use('/api', express.json())

app.use('/api', initRouter())

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://ya-praktikum.tech/api/v2',
    changeOrigin: true,
    cookieDomainRewrite: `localhost`,
  }),
)

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
