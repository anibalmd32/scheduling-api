import 'dotenv/config'

export const uri = process.env.NODE_ENV === 'prod' ? process.env.DB_URI : 'mongodb://localhost:27017/scheduling'
export const port = process.env.NODE_ENV === 'prod' ? process.env.PORT : 8080
export const clientUrl = process.env.NODE_ENV === 'prod' ? process.env.CLIENT_URL : 'http://localhost:5173'
