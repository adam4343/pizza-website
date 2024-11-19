import { cookies} from 'next/headers'
import jwt from 'jsonwebtoken'

export function getSessionUser() {
    const cookieStore = cookies()
    const token = cookieStore.get('auth-token')?.value;
    if(!token) throw new Error('No token found')
    const userId = jwt.verify(token, process.env.NEXT_PUBLIC_JWT_SECRET as string) as { userId : string }
    return userId.userId
}