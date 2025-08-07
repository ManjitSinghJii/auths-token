import { Request, Response } from "express";
import UserModel from "./user.model";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response)=> {
    try{
        const user = await UserModel.findOne({email: req.body.email})

        if(user)
            throw new Error("User all ready exit")

        await UserModel.create(req.body)
        res.json({message: "signup Success"})
    }
    catch(err: any){
        res.status(500).json({message: err.message})
    }
}

export const login = async (req: Request, res: Response)=> {
    try{
        const { email, password } = req.body
        
        if(!email || !password)
            throw new Error('All filed required')

        const user = await UserModel.findOne({email})
        if(!user)
            throw new Error('user not found..')

        const isLogin = await bcrypt.compare(password, user.password)
        if(!isLogin)
            throw new Error('user not found..')

        const payload = {
            id: user._id,
            fullname: user.fullname,
            email: user.email
        }

        const token = await jwt.sign(payload, process.env.JWT_SECREAT!, {expiresIn : "7d"})

        res.cookie('accesToken', {
            maxAge: (7 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            server: process.env.NODE_ENV === "prod",
            domain: process.env.DOMAIN
        })

        res.json({message: "login Success"})

    }
    catch(err: any){
        res.status(500).json({message: err.message})
    }
}