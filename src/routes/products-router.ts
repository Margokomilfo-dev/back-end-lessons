import {Request, Response, Router} from "express";

export const productsRouter = Router({})
export let products = [{id: 1,title: 'tomato'}, {id: 2,title: 'carrot'}]

productsRouter.get('/', (req: Request, res: Response) => {
    if(req.query.title){
        let title = req.query.title
        const ourObj = products.find(p => p.title === title)
        if(ourObj){
            res.send(ourObj)
            return
        }else {
            res.sendStatus(404)
            return;
        }
    }
    res.send(products)
})
productsRouter.get('/:title', (req: Request, res: Response) => {
    const uriParam = req.params.title
    const ourObj = products.find(p => p.title === uriParam)
    if(!ourObj) {
        res.sendStatus(404)
    }else {
        res.send(ourObj)
    }

})
productsRouter.post('', (req: Request, res: Response) => {
    const title = req.body.title

    if(!title){
        res.sendStatus(400)
        return
    }
    const newObj = {id: new Date().getTime(), title: req.body.title}
    products.push(newObj)
    res.status(201).send(newObj)
})
productsRouter.put('/:id', (req: Request, res: Response) => {
    const id = +req.params.id
    const title = req.body.title

    if(!id || !title){
        res.sendStatus(400)
        return
    }
    const product = products.find(p=> p.id === id)
    if(!product){
        res.sendStatus(404)
    }else {
        product.title = title
        res.status(201).send(product)
    }
})
productsRouter.delete('/:id', (req: Request, res: Response) => {
    const uriParam = +req.params.id
    for( let i=0; i<products.length; i++){
        if(products[i].id === uriParam){
            products.splice(i,1)
            res.sendStatus(204)
            return
        }
    }
    res.sendStatus(404)
})
productsRouter.delete('/__tests__/data', (req: Request, res: Response) => {
    products = []
    res.sendStatus(201).send(products)
})
