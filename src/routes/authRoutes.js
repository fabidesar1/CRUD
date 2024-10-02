const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    try{
        const {email, password} = req.body
        if (email === "adm123@teste.com" && password === "adm123"){
            req.session.loggedIn = true
            req.session.user = { name: 'Fábio', email: email };
            res.redirect('/');
        }else {
            res.status(401).json({ error: "E-mail ou senha inválidos" })
        }
    }
    catch (error){
        console.error('Erro no login:', error);
        return res.status(500).json({ error: "Erro interno no servidor" })
    }
})


module.exports = router