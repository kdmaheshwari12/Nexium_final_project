// lib/auth.ts
import jwt from 'jsonwebtoken'

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.YOUR_API_TOKEN!)
  } catch (err) {
    return null
  }
}
