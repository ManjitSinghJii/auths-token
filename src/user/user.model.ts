import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        trim: true,
        required: true
    }
}, {timestamps: true})

userSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password.toString(), 12)
    next()
})
const UserModel = model('User', userSchema)
export default UserModel;