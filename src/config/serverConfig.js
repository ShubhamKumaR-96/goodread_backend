import dotenv from 'dotenv'

dotenv.config()

export const PORT=process.env.PORT
export const DB_URL=process.env.DB_URL
export const JWT_SCERET=process.env.JWT_SCERET
export const JWT_EXPIRY=process.env.JWT_EXPIRY