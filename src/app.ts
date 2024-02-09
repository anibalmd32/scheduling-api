import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

import { uri, port } from './config/contants'
import { databaseConnection } from './database/connection'
import modulesRouter from './router'

void databaseConnection(uri)

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use(modulesRouter)

app.listen(port, () => {
  console.info('Server is running on port ' + port)
})
