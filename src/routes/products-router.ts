import {Request, Response, Router} from "express";
import {productsRepository} from "../repositories/products-repository";
import {idValidator, titleValidator} from "../validation/request-validators";
import {errorsValidatorCreator} from "../validation/errors-validator-creator";

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
    titleValidator,
    errorsValidatorCreator,
    (req: Request, res: Response) => {
    const product = productsRepository.createProduct(req.body.title)

    if(!product){
        res.sendStatus(400)
        return
    }
    res.status(201).send(product)
})

productsRouter.put('/:id',
    idValidator,
    titleValidator,
    errorsValidatorCreator
,(req: Request, res: Response) => {
    const id = +req.params.id
    const title = req.body.title
    const product = productsRepository.updateProduct(id, title)
    if (!product) {
        res.sendStatus(404)
    } else {
        res.status(201).send(product)
    }
})

productsRouter.delete('/:id', idValidator,(req: Request, res: Response) => {
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