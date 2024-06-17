const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const app = express();
app.use(cors());
const server = http.createServer(app);
// http://localhost:4200/chat/660e3187b9dd973de50681d8
// Connect to MongoDB
const url = 'mongodb://localhost:27017/search-database';
mongoose.connect(url)
    .then(() => console.log('Connected to the database'))
    .catch(err => console.error(err));

// Define routes
app.use(express.json());

// Middleware to log incoming requests
app.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Middleware to parse JSON bodies
app.get('/', (req, res) => {
    res.send('Hello from MEAN Realtime Chat Backend!');
});

// Define a User model
const UserSchema = new mongoose.Schema({
    email: String,
    userId: String,
    password: String,
    srchlog: [String]
});

const User = mongoose.model('user', UserSchema);
// Login endpoint
app.post('/login', async (req, res) => {
    const { emailOrUserId, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: emailOrUserId }, { userId: emailOrUserId }] });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false });
                } else if (result) {
                    console.log(`User found in DB: ${mongoose.connection.db.databaseName}, Collection: ${User.collection.name}`);
                    res.json({ success: true, uId: user._id });
                } else {
                    console.log(`No user found in DB: ${mongoose.connection.db.databaseName}, Collection: ${User.collection.name}`);
                    res.json({ success: false });
                }
            });
        } else {
            console.log(`No user found in DB: ${mongoose.connection.db.databaseName}, Collection: ${User.collection.name}`);
            res.json({ success: false });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});


// Signup endpoint
app.post('/signup', async (req, res) => {
    const { email, userId, password } = req.body;

    try {
        const user = await User.findOne({ $or: [{ email: email }, { userId: userId }] });
        if (user) {
            console.log(`User already exists in DB: ${mongoose.connection.db.databaseName}, Collection: ${User.collection.name}`);
            res.json({ success: false, message: 'User already exists' });
        } else {
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ success: false });
                } else {
                    const newUser = new User({ email, userId, password: hash });
                    await newUser.save();
                    console.log(`User created in DB: ${mongoose.connection.db.databaseName}, Collection: ${User.collection.name}`);
                    res.json({ success: true, uId: newUser._id });
                }
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false });
    }
});
const CompanySchema = new mongoose.Schema({
    name: String,
    url: String
});

const Company = mongoose.model('companies', CompanySchema);

// Search endpoint
app.post('/search', async (req, res) => {
    try {
        console.log(`Search request received: ${req.body.companyName}`);
        console.log(`User ID: ${req.body.uId}`);
        const { companyName, uId } = req.body;
        const company = await Company.findOne({ name: companyName });
        if (!company) {
            console.log(`Company not found: ${companyName}`);
            res.status(404).json({ error: 'Company not found' });
        } else {
            console.log(`Company found: ${company.name}, Website: ${company.url}`);
            const user = await User.findById(uId);
            if (user) {
                user.srchlog.push(company.name);
                await user.save();
            }
            res.json(company);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});




