import mongoose from 'mongoose'
import {IUser} from '../config/interface'
const useSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add your name"],
        trim: true,
        maxLength: [20, "Your name is up to 20 chars long."]
    },
    account: {
       type: String,
       required: [true, "Please add your email or phone"],
       trim: true,
       unique: true
    },
    password: {
       type: String,
       required: [true, "Please add your password"],
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dbk7fpvvu/image/upload/v1629864353/auth/avatar_crsh7h.jpg'
    },
    role: {
        type: String,
        default: 'user' //admin
    },
    type: {
        type: String,
        default: 'register' //social - phone number - ...
    }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('Users', useSchema)