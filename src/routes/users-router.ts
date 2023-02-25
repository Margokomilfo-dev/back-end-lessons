import {Request, Response, Router} from "express";
import {usersService} from "../users-service";

export const usersRouter = Router({})


usersRouter.post('',
    async (req: Request, res: Response) => {
    const user = await usersService.createUser(req.body.login, req.body.password,req.body.email)
    res.status(201).send(user)
})
