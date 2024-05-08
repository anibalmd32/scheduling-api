import { connect } from 'mongoose'

export async function databaseConnection (uri: string): Promise<void> {
  try {
    await connect(uri)
    console.info('Database has been connected')
  } catch (error) {
    console.error('Error to connect database', error)
    process.exit(1)
  }
}
