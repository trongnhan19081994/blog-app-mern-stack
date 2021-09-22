import { Response, NextFunction } from "express"
import Users from '../models/userModel'
import jwt from 'jsonwebtoken'
import { IDecodedToken, IReqAuth } from "../config/interface"

export const auth = async (req: IReqAuth, res: Response, next: NextFunction) => {
    try {
       const token = req.header("Authorization") 
       if(!token) return res.status(400).json({msg: 'Invalid Authentication.'})
       const decoded = <IDecodedToken>jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`)
       if(!decoded) return res.status(400).json({msg: 'Invalid Authentication.'})
       
       const user = await Users.findOne({_id: decoded.id})
       if(!user) return res.status(400).json({msg: 'User does not exits.'})
       req.user = user

       next()
    } catch (error: any) {
        return res.status(500).json({msg: error.message})
    }
}