import {Request, Response, Router} from "express";

export const addressesRouter = Router({})
const addresses = [{id: 1, value: 'Mira 1'}, {id:2, value: 'Alboraya 2'}]
addressesRouter.get('/', (_req: Request, res: Response) => {
    res.send(addresses)
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const uriParam = req.params.id
    const ourObj = addresses.find(p => p.id === +uriParam)
    if(!ourObj) {
        res.sendStatus(404)
    }else {
        res.send(ourObj)
    }
})