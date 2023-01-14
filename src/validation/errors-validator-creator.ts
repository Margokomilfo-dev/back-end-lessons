import {validationResult} from "express-validator";
import {NextFunction, Request, Response} from "express";

export const errorsValidatorCreator = (req: Request, res: Response, next:NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send(errors.array().map(err => {return {param: err.param, message: err.msg}}));
        return
    }else {
        next()
    }
}