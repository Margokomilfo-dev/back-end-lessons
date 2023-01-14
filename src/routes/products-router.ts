import {NextFunction, Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {body, validationResult} from "express-validator";

export const productsRouter = Router({})

productsRouter.get('/', (req: Request, res: Response) => {
    const products = productsRepository.getProducts(req.query.title?.toString())
    res.send(products)
})

productsRouter.get('/:title', (req: Request, res: Response) => {
    const uriParam = req.params.title
    const product = productsRepository.getProduct(uriParam)
    if (!product) {
        res.sendStatus(404)
    } else {
        res.send(product)
    }

})

productsRouter.post('',
    body('title').trim().isLength({ min: 3, max: 10}),
    (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ title: 'not valid' });
        return
    }

    const product = productsRepository.createProduct(req.body.title)

    if(!product){
        res.sendStatus(400)
        return
    }
    res.status(201).send(product)
})

productsRouter.put('/:id', (req: Request, res: Response, next: NextFunction)=> {
    const id = +req.params.id
    const title = req.body.title
    if (!id || !title) {
        res.sendStatus(400)
    }else {
        next()
    }
},(req: Request, res: Response) => {
    const id = +req.params.id
    const title = req.body.title
    const product = productsRepository.updateProduct(id, title)
    if (!product) {
        res.sendStatus(404)
    } else {
        res.status(201).send(product)
    }
})

productsRouter.delete('/:id', (req: Request, res: Response) => {
    const uriParam = +req.params.id
    const isDeleted = productsRepository.deleteProduct(uriParam)
   if(isDeleted){
       res.sendStatus(204)
       return
   }
    res.sendStatus(404)
})


//------------------tests----------------------------------------------------------------
productsRouter.delete('/__tests__/delete-all', (req: Request, res: Response)=> {
    const products = productsRepository.deleteAll()
    res.send(products)
})