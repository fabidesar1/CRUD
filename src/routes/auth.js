const express = require('express');
const router = express.Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs');
const Post = require('../models/post')

const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

const verifyPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
};

router.post('/signup', async (req, res) => {
    try{
        const {username, password} = req.body
        const existingUser = await User.findOne({ username })
        if(!existingUser){
            const hashedPassword = await hashPassword(password);
            const user = new User({
                username,
                password: hashedPassword
            })

            await user.save()
            res.redirect("/login")
        }else{
            return res.redirect("/signup?error=Email já cadastrado");
        }
    }catch(error){
        return res.status(500).json({ error: "Erro interno no servidor" })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            const isValid = await verifyPassword(password, existingUser.password);
            if (isValid) {
                req.session.loggedIn = true;
                req.session.user = {username}; 
                res.redirect('/'); 
            } else {
                res.status(401).json({ error: "E-mail ou senha inválidos" });
            }
        } else {
            res.status(401).json({ error: "E-mail ou senha inválidos" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
});

router.post('/', async (req, res) => {
    try{
        const { username, url, description} = req.body
        const post = new Post({
            username: username,
            url: url,
            description: description
        })

        await post.save()
        res.redirect(`/`);
    }catch(error){
        console.error(error);
        return res.status(500).json({ error: "Erro interno no servidor" });
    }
})

router.get("/api/user", (req, res) => {
    if (req.session.loggedIn) {
        res.json(req.session.user);
    } else {
        res.status(401).json({ error: "Usuário não está logado" });
    }
});

router.get("/api/posts/:user", async (req, res) => {
    try {
        const username = req.params.username;

        const posts = await Post.find({ username: username });
        
        if (posts.length === 0) {
            return res.status(404).json({ error: "Nenhum post encontrado para este usuário." });
        }

        res.json(posts);
    } catch (error) {
        console.error('Erro ao buscar posts:', error);
        res.status(500).json({ error: "Erro ao buscar posts do usuário" });
    }
});

router.get("/api/posts", async (req, res) => {
    if (req.session.loggedIn) {
        try {
            const posts = await Post.find();
            res.json(posts);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(401).send('Unauthorized');
    }
});

router.put('/api/posts/:id', async (req, res) => {
    const postId = req.params.id;
    const { description, url } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { description, url },
            { new: true } 
        );
        if (!updatedPost) {
            return res.status(404).send('Post não encontrado');
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Erro ao atualizar o post:', error);
        res.status(500).send('Erro ao atualizar o post');
    }
});

router.delete("/posts/:id", async (req, res) => {
    try {
    const postId = req.params.id;
    await Post.findByIdAndDelete(postId);
    res.redirect(`/`);
    }catch (error){
        console.error('Erro ao excluir o post:', error);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
    
})

router.post('/api/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Não foi possível fazer logout' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout realizado com sucesso' });
    });
});

module.exports = router