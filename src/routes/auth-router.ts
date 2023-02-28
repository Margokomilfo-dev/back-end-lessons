import {Request, Response, Router} from "express";
import {usersService} from "../services/users-service";
import {jwtService} from "../services/jwt-service";

export const authRouter = Router({})


authRouter.post('',
    async (req: Request, res: Response) => {
        const user = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
        if (user) {
          const token = await jwtService.createJWTToken(user)
          res.status(201).send(token)
        }else
          res.sendStatus(401)
    })
