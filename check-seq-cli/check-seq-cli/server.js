const express = require('express')
const PORT = process.env.PORT || 3000
const app = express()
const { Product } = require('./models')

app.get('/products', async (req, res) => {
    const products = await Product.findAll()
    res.json(products)
})

app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByPk(id)
        if (!product) throw Error('Product not found')
        res.json(product)
    } catch (e) {
        console.log(e)
        res.send('Product not found!')
    }
})

app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
});
app.get('/', (req, res) => {
  res.send("This is root!")
})