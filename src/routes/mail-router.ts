import {Request, Response, Router} from "express";
import {emailAdapter} from "../adapters/emailAdapter";

export const emailRouter = Router({})


emailRouter.post('',
    async (req: Request, res: Response) => {

        await emailAdapter.sendMessage(req.body.email, req.body.subject, req.body.message)

        res.status(200).send({
            email: req.body.email,
            message: req.body.message,
            subject: req.body.subject,
        })
    })
