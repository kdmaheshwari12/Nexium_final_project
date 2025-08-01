import mongoose, { Schema } from 'mongoose'

     const userSchema = new Schema({
         username: {
             type: String,
             required: [true, 'Please provide a username'],
             unique: true,
         },
         email: {
             type: String,
             required: [true, 'Please provide an email'],
             unique: true,
             lowercase: true,
         },
         password: {
             type: String,
             required: [true, 'Please provide a password'],
         },
     })

    const User = mongoose.models.User || mongoose.model('User', userSchema)
export default User