import 'dotenv/config'

export const uri = process.env.NODE_DEV === 'prod' ? process.env.DB_URI : 'mongodb://localhost:27017/scheduling'
export const port = process.env.NODE_DEV === 'prod' ? process.env.PORT : 8080
