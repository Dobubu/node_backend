const logger = require('./logger')

// Part 3（a）- 定義 Middleware。印出發送到服務端的每個請求訊息
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()  // 將控制權交給下一個 Middleware
}

// Part 3（a）- 定義 Middleware。擷取不存在的路由發出的請求，並回傳錯誤訊息
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// Part 3（a）- 定義 Middleware。error handle
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}