const express = require('express');
const router = express.Router();
const axios = require('axios'); // For making HTTP requests
const db = require('../db');
const { ensureAuthenticated } = require('../authMiddleware');



//  GET all categories im my dab
router.get('/', (req, res) => {
db.query('SELECT * FROM categories', (err, results) => {
if (err) {
    console.error('Error fetching categories: ', err);
    res.status(500).json({ error: 'Error fetching categories' });
    return;
}
res.json(results);
});
});

// GET all categories from external API
// router.get('/', async (req, res) => {
//     try {
//         const response = await axios.get('https://fakestoreapi.com/products/categories');
//         const categories = response.data;
//         res.json(categories);
//     } catch (error) {
//         console.error('Error fetching categories: ', error);
//         res.status(500).json({ error: 'Error fetching categories' });
//     }
// });


// POST new category
router.post('/', ensureAuthenticated, (req, res) => {
const { name } = req.body;
db.query('INSERT INTO categories (name) VALUES (?)', [name], (err, results) => {
if (err) {
    console.error('Error creating category: ', err);
    res.status(500).json({ error: 'Error creating category' });
    return;
}
res.status(201).send('Category created successfully');
});
});

// PUT update category
router.put('/:id', ensureAuthenticated, (req, res) => {
const { id } = req.params;
const { name } = req.body;
db.query('UPDATE categories SET name = ? WHERE id = ?', [name, id], (err, results) => {
if (err) {
    console.error('Error updating category: ', err);
    res.status(500).json({ error: 'Error updating category' });
    return;
}
res.send('Category updated successfully');
});
});

// DELETE category
router.delete('/:id', ensureAuthenticated, (req, res) => {
const { id } = req.params;
db.query('DELETE FROM categories WHERE id = ?', [id], (err, results) => {
if (err) {
    console.error('Error deleting category: ', err);
    res.status(500).json({ error: 'Error deleting category' });
    return;
}
res.send('Category deleted successfully');
});
});

module.exports = router;