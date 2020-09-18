// Part 3（C）MongoDb
const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
   console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const dbname = 'note-app'

const url = `mongodb+srv://fullstack:${password}@cluster0.ay01g.mongodb.net/${dbname}?retryWrites=true&w=majority`;

console.log('connecting to', url)

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
  content: 'Callback function suck',
  date: new Date(),
  important: false,
})

// create
// note.save().then(result => {
//   console.log('note saved!')
//   mongoose.connection.close()
// })

// search
Note.find({ important: false }).then(result => {
  result.forEach(note => {
    console.log(note)
  })
  console.log(result)
  mongoose.connection.close()
})

// Mongoose：https://mongoosejs.com/index.html
// Schemas：https://mongoosejs.com/docs/guide.html
// Models：https://mongoosejs.com/docs/models.html