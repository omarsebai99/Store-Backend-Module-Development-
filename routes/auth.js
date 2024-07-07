// auth.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const db = require('../db');

// Login endpoint
router.post('/login', passport.authenticate('local', {
successRedirect: '/dashboard', // Redirect on successful login
failureRedirect: '/login', // Redirect on failure
failureFlash: true // Enable flash messages
}));

// Registration endpoint
router.post('/register', async (req, res) => {
const { username, password } = req.body;
try {
// Hash password
const hashedPassword = await bcrypt.hash(password, 10);
// Insert user into database
db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
    if (err) {
    console.error(err);
    res.status(500).send('Error registering user');
    } else {
    res.status(201).send('User registered successfully');
    }
});
} catch (error) {
console.error(error);
res.status(500).send('Error registering user');
}
});

// Logout endpoint
router.get('/logout', (req, res) => {
req.logout();
res.redirect('/');
});

module.exports = router;
