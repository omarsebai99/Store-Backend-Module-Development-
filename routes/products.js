const express = require('express');
const router = express.Router();
const axios = require('axios'); // For making HTTP requests
const db = require('../db');
const { ensureAuthenticated } = require('../authMiddleware');


// GET all products in mu db
router.get('/', (req, res) => {
db.query('SELECT * FROM products', (err, results) => {
    if (err) {
        console.error('Error fetching products: ', err);
        res.status(500).json({ error: 'Error fetching products' });
        return;
    }
    res.json(results);
});
});

// GET all products from external API
// router.get('/', async (req, res) => {
//     try {
//         const response = await axios.get('https://fakestoreapi.com/products');
//         const products = response.data;
//         res.json(products);
//     } catch (error) {
//         console.error('Error fetching products: ', error);
//         res.status(500).json({ error: 'Error fetching products' });
//     }
// });

// POST new product
router.post('/', ensureAuthenticated, (req, res) => {
const { name, price, category_id } = req.body;
db.query('INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)', [name, price, category_id], (err, results) => {
    if (err) {
        console.error('Error creating product: ', err);
        res.status(500).json({ error: 'Error creating product' });
        return;
    }
    res.status(201).send('Product created successfully');
});
});

// PUT update product
router.put('/:id', ensureAuthenticated, (req, res) => {
const { id } = req.params;
const { name, price, category_id } = req.body;
db.query('UPDATE products SET name = ?, price = ?, category_id = ? WHERE id = ?', [name, price, category_id, id], (err, results) => {
    if (err) {
        console.error('Error updating product: ', err);
        res.status(500).json({ error: 'Error updating product' });
        return;
    }
    res.send('Product updated successfully');
});
});

// DELETE product
router.delete('/:id', ensureAuthenticated, (req, res) => {
const { id } = req.params;
db.query('DELETE FROM products WHERE id = ?', [id], (err, results) => {
    if (err) {
        console.error('Error deleting product: ', err);
        res.status(500).json({ error: 'Error deleting product' });
        return;
    }
    res.send('Product deleted successfully');
});
});

module.exports = router;