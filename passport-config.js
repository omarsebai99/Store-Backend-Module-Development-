// passport-config.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('./db');

passport.use(new LocalStrategy(
{ usernameField: 'username' }, // Specify field names for username and password
async (username, password, done) => {
try {
    // Query your database to find the user by username
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
    if (err) {
        return done(err);
    }
    if (!results.length) {
        return done(null, false, { message: 'Username not found' });
    }
    const user = results[0];
    // Compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
        return done(null, user); // User authenticated successfully
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
    });
} catch (error) {
    return done(error);
}
}
));

// Serialize and deserialize user (required for session handling)
passport.serializeUser((user, done) => {
done(null, user.id);
});

passport.deserializeUser((id, done) => {
db.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
if (err) {
    return done(err);
}
const user = results[0];
done(null, user);
});
});