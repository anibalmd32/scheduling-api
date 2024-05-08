import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './router'
import { uri, port } from './utils/contants'
import { databaseConnection } from './database/connection'

void databaseConnection(uri)
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(cors())
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send('Scheduling API V1 is running')
})
app.use(router);

app.listen(port, () => {
  console.info('Server is running on port ' + port)
})
