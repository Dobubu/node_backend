const config = require('./utils/config')

// Part 3（C）
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Part 3（a）Web and express
const express = require('express')
const app = express()
// const bodyParser = require('body-parser')

// Part 3（C）
const Note = require('./models/note')

// Part 3（b）Same origin policy and CORS
const cors = require('cors')

// Part 3（b）- cors 一種 Middleware，允許來自其他來源的請求
app.use(cors())

// Part 3（a）- json-parser，是一種 Middleware
// 獲取請求的JSON數據，將其轉換為JavaScript對象，然後在調用路由處理程序之前將其附加到請求對象的body屬性
app.use(express.json())

// app.use(bodyParser.json())

// Part 3（b）- 讓 express 顯示 static content
// 當 express 收到 http get 請求，會先檢查 build 是否包含對應的是否包含對應的文件，若有會返回該文件內容
// 所以放問 http://localhost:3001，會返回前端畫面
app.use(express.static('build'))

// Part 3（a）- 定義 Middleware。印出發送到服務端的每個請求訊息
const logger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:  ', request.path)
  console.log('Body:  ', request.body)
  console.log('---')
  next() // 將控制權交給下一個 Middleware
}
app.use(logger)

// let notes = [
//   {
//     id: 1,
//     content: 'HTML is easy',
//     date: '2019-05-30T17:30:31.098Z',
//     important: true
//   },
//   {
//     id: 2,
//     content: 'Browser can execute only Javascript',
//     date: '2019-05-30T18:39:34.091Z',
//     important: false
//   },
//   {
//     id: 3,
//     content: 'GET and POST are the most important methods of HTTP protocol',
//     date: '2019-05-30T19:20:14.298Z',
//     important: true
//   }
// ]

// Part 3（a）- 設置路由做事件處理
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({}).then(notes => {
    response.json(notes.map(note => note.toJSON()))
  })
})

// const generateId = () => {
//   const maxId = notes.length > 0
//     ? Math.max(...notes.map(n => n.id))
//     : 0
//   return maxId + 1
// }

app.post('/api/notes', (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
  })

  note
    .save()
    .then(savedNote => savedNote.toJSON())
    .then(savedAndFormattedNote => {
      response.json(savedAndFormattedNote)
    })
    .catch(error => next(error))
})

app.get('/api/notes/:id', (request, response, next) => {
  const id = request.params.id

  Note.findById(id)
    .then(note => {
      if (note) {
        response.json(note.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      next(error)
    })
})

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id

  Note.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/notes/:id', (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(request.params.id, note, { new: true })
    .then(updatedNote => {
      response.json(updatedNote.toJSON())
      // response.json(updatedNote)
    })
    .catch(error => next(error))
})

// Part 3（a）- 定義 Middleware。擷取不存在的路由發出的請求，並回傳錯誤訊息
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// Part 3（a）- 定義 Middleware。error handle
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

// Part 3（a）- 綁定 HTTP 服務器，分配給 app，並監聽發送到端口 3001 的 HTTP 請求
const PORT = config.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

// findByIdAndUpdate：https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate