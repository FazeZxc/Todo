import express , { Express , Request , Response , NextFunction } from 'express'
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const jwtsecret = process.env.JWTSECRET;

export const authenticationToken = ( req: Request , res: Response , next:NextFunction ) => {
    const token:string  = req.cookies.token
    if(!token) return res.sendStatus(401)

}