import { connect } from 'mongoose'
import { uri } from '../../config/contants'
import { daysSeeder } from './days'

connect(uri)
  .then(async conn => {
    await daysSeeder()
  })
  .catch(err => { console.error(err) })
