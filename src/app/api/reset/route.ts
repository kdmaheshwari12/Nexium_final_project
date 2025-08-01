import { connect } from '@/db_config/dbconfig'
     import User from '@/models/usermodel'
     import { NextRequest, NextResponse } from 'next/server'
     import bcrypt from 'bcryptjs'

     connect()

     export async function POST(request: NextRequest) {
         try {
             const { email, newPassword } = await request.json()
             const lowercaseEmail = email.toLowerCase()
             const user = await User.findOne({ email: lowercaseEmail })
             if (!user) {
                 return NextResponse.json({ error: 'User not found' }, { status: 404 })
             }
             const hashedPassword = await bcrypt.hash(newPassword, 10)
             user.password = hashedPassword
             await user.save()
             return NextResponse.json({ message: 'Password reset successfully' })
         } catch (error: any) {
             return NextResponse.json({ error: error.message }, { status: 500 })
         }}
    