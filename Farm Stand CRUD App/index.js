//all required middleware
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

//product schema from mongoose saved in the models folder. Only one model needed for this.
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

//all app.sets
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//all app.uses
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))

//baked in for demonstration purposes
const categories = ['fruit', 'vegetable', 'dairy'];

//get full list of products - sends to index.ejs
app.get('/products', async (req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})

//render the new product form - sends to new.ejs
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

//post the new products to the products collection - adds new project (using new.ejs) and sends to show.ejs for that product
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.redirect(`/products/${newProduct._id}`)
})

//show display for specific products - sends to show.ejs
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/show', { product })
})

//edit a specific product -- gets the edit product page
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})

//updates the product from the edit product page
app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect(`/products/${product._id}`);
})

//delete the specified product
app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');
})



app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})

