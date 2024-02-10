// * Libs
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'

// * Setup configs
import { uri, port } from './config/contants'
import { databaseConnection } from './database/connection'

// * Modules routes
import daysRoutes from './modules/days/days.routes'
import classroomsRoutes from './modules/classrooms/classrooms.routes'
import professorsRoutes from './modules/professors/professors.routes'
import schedulesRoutes from './modules/schedules/schedules.routes'
import semestersRoutes from './modules/semesters/semesters.routes'

// ? Connect with database
void databaseConnection(uri)

// ? Create Express App
const app = express()

// * Express midlewares
app.use(express.json()) // ? Allow work with JSON data
app.use(cors()) // ? Allow clients connection
app.use(morgan('dev')) // ? Server activity logger

// * Express routing
app.use('/api', daysRoutes)
app.use('/api', classroomsRoutes)
app.use('/api', professorsRoutes)
app.use('/api', schedulesRoutes)
app.use('/api', semestersRoutes)

// ? Start Express server
app.listen(port, () => {
  console.info('Server is running on port ' + port)
})
