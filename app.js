const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const session = require('express-session');
const passport = require('passport');
const authRouter = require('./routes/auth');

const categoriesRouter = require('./routes/categories');
const productsRouter = require('./routes/products');

app.use('/categories', categoriesRouter);
app.use('/products', productsRouter);
app.use('/auth', authRouter);

// Middleware
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
secret: 'your_secret_key',
resave: false,
saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport configuration
require('./passport-config');

module.exports = app;


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});