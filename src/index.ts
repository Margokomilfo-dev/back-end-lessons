import express, {Request, Response} from 'express'
import {addressesRouter} from "./routes/addresses-router";
import {productsRouter} from "./routes/products-router";
import {usersRouter} from "./routes/users-router";
//import {runDb} from "./mongo/db";
import {emailRouter} from "./routes/mail-router";

export const app = express()
const port = 3001

app.use(express.json())
app.use('/addresses', addressesRouter)
app.use('/products', productsRouter)
app.use('/users', usersRouter)
app.use('/email', emailRouter)

app.get('/', (req: Request, res: Response)=> {
    res.send('Hello back-end lessons in it-incubator!!!')
})

app.get('/__tests__/delete-all', (req: Request, res: Response)=> {
    res.send('Hello back-end lessons in it-incubator!!!')
})


const startApp = async () => {
    // await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()