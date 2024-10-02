const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: 'segredo_super_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.static(path.join(__dirname, '../public')));

app.use(authRoutes);

const PORT = 3230

app.get("/login", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/signin.html'));
});

app.get("/signup", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/signup.html'))
})

app.get("/", (req, res) => {
    if (req.session.loggedIn){
        res.sendFile(path.join(__dirname, '../public/home.html'));
    } else {
        res.status(401)
        res.redirect('/login');
    }
});

app.use((req, res) => {
    res.status(404).json({ error: "Página não encontrada" });
});

app.listen(PORT, () => {
    console.log(`http://localhost:3230/`);
});