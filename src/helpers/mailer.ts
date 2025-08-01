import nodemailer from 'nodemailer'
import User from '@/models/usermodel'
import { randomUUID } from 'crypto'

interface SendEmailParams {
  email: string
  emailType: 'VERIFY' | 'RESET'
  userId: string
}

export const sendEmail = async ({ email, emailType, userId }: SendEmailParams) => {
  try {
    // Validate environment variables
    if (!process.env.MAILTRAP_USER || !process.env.MAILTRAP_PASS || !process.env.DOMAIN) {
      throw new Error('Missing required environment variables: MAILTRAP_USER, MAILTRAP_PASS, or DOMAIN')
    }

    // Generate a simple token
    const token = randomUUID()

    // Update user with token
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: token,
          verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
        },
      })
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: token,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      })
    }

    // Dynamic link based on type
    const link =
      emailType === 'VERIFY'
        ? `${process.env.DOMAIN}/verifyemail?token=${token}`
        : `${process.env.DOMAIN}/resetpassword?token=${token}`

    // Create reusable transporter using Mailtrap SMTP
    const transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 587,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
      connectionTimeout: 10000, // 10 seconds
      socketTimeout: 10000,
    })

    const mailOptions = {
      from: '"Nexium App" <no-reply@nexium.com>',
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `<p>Click <a href="${link}">here</a> to ${
        emailType === 'VERIFY' ? 'verify your email' : 'reset your password'
      } or copy and paste the following link in your browser:</p>
             <p>${link}</p>`,
    }

    const mailResponse = await transporter.sendMail(mailOptions)
    console.log(`Email sent successfully to ${email} for ${emailType}`)
    return mailResponse
  } catch (error: any) {
    console.error(`Failed to send ${emailType} email to ${email}:`, {
      message: error.message,
      stack: error.stack,
    })
    throw new Error(`Failed to send ${emailType} email: ${error.message}`)
  }
}