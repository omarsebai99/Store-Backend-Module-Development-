// seed.js
const axios = require('axios');
const db = require('./db'); // Assuming your db.js file is in the same directory

// Fetch categories from FakeStoreAPI
async function fetchCategories() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        return response.data;
    } catch (error) {
        console.error('Error fetching categories:', error);
        return [];
    }
}

// Fetch products from FakeStoreAPI
async function fetchProducts() {
    try {
        const response = await axios.get('https://fakestoreapi.com/products');
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to seed categories into the database
async function seedCategories(categories) {
    try {
        for (const category of categories) {
            await db.query('INSERT INTO categories (name) VALUES (?)', [category]);
        }
        console.log('Categories seeded successfully');
    } catch (error) {
        console.error('Error seeding categories:', error);
    }
}

// Function to seed products into the database
async function seedProducts(products) {
    try {
        for (const product of products) {
            await db.query('INSERT INTO products (name, price, category_id) VALUES (?, ?, ?)', [product.title, product.price, product.category_id]);
        }
        console.log('Products seeded successfully');
    } catch (error) {
        console.error('Error seeding products:', error);
    }
}

// Seed function to orchestrate the seeding process
async function seed() {
    const categories = await fetchCategories();
    await seedCategories(categories);

    const products = await fetchProducts();
    await seedProducts(products);

    db.end(); // Close database connection after seeding
}

seed();
