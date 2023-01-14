import express, {Request, Response} from 'express'
import bodyParser from 'body-parser'
import {addressesRouter} from "./routes/addresses-router";
import {productsRouter} from "./routes/products-router";

export const app = express()
const port = 3001

app.use(bodyParser({}))
app.use('/addresses', addressesRouter)
app.use('/products', productsRouter)

app.get('/', (req: Request, res: Response)=> {
    res.send('Hello back-end lessons in it-incubator!!!')
})

app.get('/__tests__/delete-all', (req: Request, res: Response)=> {
    res.send('Hello back-end lessons in it-incubator!!!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})