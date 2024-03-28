import express , { Express , Request , Response , NextFunction } from 'express'
import dotenv from 'dotenv'
import jwt, { Secret } from 'jsonwebtoken'

dotenv.config()
const app:Express = express()
const jwtsecret:string | undefined = process.env.JWTSECRET;

export const authenticationToken = ( req: Request , res: Response , next:NextFunction ) => {
    const token:string | undefined = req.cookies.token
    if(!token) return res.sendStatus(401)

    try{
        const decodedToken: any = jwt.verify(token , jwtsecret as string)

        // req.decodedToken = decodedToken
        next()
    }catch(error){
        console.error("Token authentication error" , error);
        return res.sendStatus(403).redirect("/auth/login")
    }

}