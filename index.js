const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

// Part 3（a）- 綁定 HTTP 服務器，分配給 app，並監聽發送到端口 3001 的 HTTP 請求
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})