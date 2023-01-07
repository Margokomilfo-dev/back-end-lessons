import express, {Response, Request} from 'express'
import bodyParser from 'body-parser'

const app = express()
const port = 3001

app.use(bodyParser({}))

const products = [{id: 1,title: 'tomato'}, {id: 2,title: 'carrot'}]
const addresses = [{id: 1, value: 'Mira 1'}, {id:2, value: 'Alboraya 2'}]

app.get('/products', (req: Request, res: Response) => {
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
app.get('/products/:title', (req: Request, res: Response) => {
    const uriParam = req.params.title
    const ourObj = products.find(p => p.title === uriParam)
    if(!ourObj) {
        res.sendStatus(404)
    }else {
        res.send(ourObj)
    }

})
app.post('/products', (req: Request, res: Response) => {
    const title = req.body.title
    if(!title){
        res.sendStatus(400)
        return
    }
    const newObj = {id: new Date().getTime(), title: req.body.title}
    products.push(newObj)
    res.status(201).send(newObj)
})
app.put('/products/:id', (req: Request, res: Response) => {
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
app.delete('/products/:id', (req: Request, res: Response) => {
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

app.get('/addresses', (_req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const uriParam = req.params.id
    const ourObj = addresses.find(p => p.id === +uriParam)
    if(!ourObj) {
        res.sendStatus(404)
    }else {
        res.send(ourObj)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})