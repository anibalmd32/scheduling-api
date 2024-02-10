import 'dotenv/config'

export const uri = process.env.DB_URI ?? 'mongodb://127.0.0.1:27017/scheduling'
export const port = process.env.PORT ?? 8080
