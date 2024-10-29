require('dotenv').config();
const express = require('express');
const session = require('express-session');  
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const authRoutes = require('./routes/auth');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 2 * 60 * 60 * 1000 }  // 2 horas
}));


app.use(express.static(path.join(__dirname, '../public')));


app.use(authRoutes);


const PORT = process.env.PORT || 3230;


const mongoUri = process.env.MONGO_URI;

mongoose.connect(mongoUri)
    .then(() => console.log('Conectado ao MongoDB'))
    .catch(err => console.error('Erro ao conectar ao MongoDB', err));


app.get("/login", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/signin.html'));
});


app.get("/signup", (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../public/signup.html'));
});


app.get("/", async (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    } else {
        res.status(401).redirect('/login');
    }
});

app.get('/perfil/:id', (req, res) => {
    if (req.session.loggedIn) {
        res.sendFile(path.join(__dirname, '../public/perfil.html'));
    }else {
        res.status(401).redirect('/login');
    }
})

app.use((req, res) => {
    res.status(404).json({ error: "Página não encontrada" });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
