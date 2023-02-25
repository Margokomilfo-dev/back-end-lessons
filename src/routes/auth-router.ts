import {Request, Response, Router} from "express";
import {usersService} from "../users-service";

export const authRouter = Router({})


authRouter.post('',
    async (req: Request, res: Response) => {
  const checkResult = await usersService.checkCredentials(req.body.loginOrEmail, req.body.password)
})
