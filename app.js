const config = require('./utils/config')

// Part 3（a）Web and express
const express = require('express')
const app = express()

// Part 3（b）Same origin policy and CORS
const cors = require('cors')
const notesRouter = require('./controllers/notes')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connection to MongoDB:', error.message)
  })

// Part 3（b）- cors 一種 Middleware，允許來自其他來源的請求
app.use(cors())

// Part 3（b）- 讓 express 顯示 static content
// 當 express 收到 http get 請求，會先檢查 build 是否包含對應的是否包含對應的文件，若有會返回該文件內容
// 所以放問 http://localhost:3001，會返回前端畫面
app.use(express.static('build'))

// Part 3（a）- json-parser，是一種 Middleware
// 獲取請求的JSON數據，將其轉換為JavaScript對象，然後在調用路由處理程序之前將其附加到請求對象的body屬性
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/notes', notesRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app