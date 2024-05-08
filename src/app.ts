import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './router'
import { uri, port } from './utils/contants'
import { databaseConnection } from './database/connection'

console.info('Starting server...', process.env.NODE_DEV, process.env.PORT, process.env.DB_URI)

void databaseConnection(uri)
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use(morgan('dev'))

app.use(router);

app.listen(port, () => {
  console.info('Server is running on port ' + port)
})
