import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './router'
import { uri, port } from './utils/contants'
import { databaseConnection } from './database/connection'
import path from 'node:path'

void databaseConnection(uri)
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use(morgan('dev'))

app.use(router);

// catch 404 and forward to error handler
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

app.listen(port, () => {
  console.info('Server is running on port ' + port)
})
