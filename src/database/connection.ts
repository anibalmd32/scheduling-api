import { connect } from 'mongoose'

export async function databaseConnection (uri: string): Promise<void> {
  try {
    console.info('Connecting to database...', uri)
    await connect(uri)
    console.info('Database has been connected')
  } catch (error) {
    console.error('Error to connect database', error)
    process.exit(1)
  }
}
