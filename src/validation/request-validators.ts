import {body, param} from "express-validator";

export const titleValidator = body('title').trim().isLength({ min: 3, max: 10}).withMessage('title not valid')
export const idValidator = param('id').isNumeric().withMessage('id not valid')