import {NextFunction, Response,Request} from "express";
import {jwtService} from "../services/jwt-service";
import {usersService} from "../services/users-service";

export const authMiddleware = async (req:Request, res:Response, next: NextFunction) => {
    if(!req.headers.authorization){
        res.send(401)
        // next() //??
        return //??
    }
    const token = req.headers.authorization.split(' ')[1]
    const userId = await jwtService.getUserIdByToken(token)
    if(userId){
        req.user = await usersService.findUserById(userId)
        next()
    }
    res.send(401)
    // next() //??
    return //??
}
