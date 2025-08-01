// helpers/verifyToken.ts
import jwt from 'jsonwebtoken'

export function verifyToken(token: string): any {
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET!)
    return decoded
  } catch (err) {
    return null
  }
}
