let products = [{id: 1, title: 'tomato'}, {id: 2, title: 'carrot'}]
export type ProductType = { id: number, title: string }


export const productsRepository = {
    getProducts(title: string | undefined): ProductType | Array<ProductType> | null {
        if (title) {
            return products.filter(product => product.title === title)
        }
        return products
    },
    getProduct(title: string): ProductType | undefined {
        return products.find(p => p.title === title)
    },

    createProduct(title: string | undefined): null | ProductType {
        if (!title) {
            return null
        }
        const newObj = {id: new Date().getTime(), title}
        products.push(newObj)
        return newObj
    },

    updateProduct(id: number, title: string): null | ProductType {
        const product = products.find(p => p.id === id)
        if (!product) {
            return null
        } else {
            product.title = title
            return product
        }
    },
    deleteProduct(id: number): boolean {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    },
    deleteAll() {
        products = []
        return products
    }
}