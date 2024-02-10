// ** For database connection
import { connect, connection } from 'mongoose'
import { uri } from '../../utils/contants'

// ** Seeds
import { daysSeeder } from './days'
import { semestersSeeder } from './semesters'
import { classroomsSeeder } from './classrooms'

connect(uri)
  .then(async conn => {
    console.info('Database connection open')
    console.info('Sedding database...')

    await daysSeeder()
    await semestersSeeder()
    await classroomsSeeder()

    console.info('Database has been seeding')
  })
  .catch(err => {
    console.error('An error ocurred to try execute seeders: ', err)
  })
  .finally(() => {
    connection.close()
      .then(success => {
        console.log('Database connection closed successfully')
      })
      .catch(err => {
        console.error('An error ocurred to try close the database connection', err)
      })
  })
