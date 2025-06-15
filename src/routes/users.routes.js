import express from 'express';

import jwt from 'jsonwebtoken';

import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "KFJJWJEI83283UFH@@KFJU84]";

router.use(express.json())

router.get('/test', (req, res) => {
    res.json({ mensagem: 'API do Academy está online!, endpoit: users' });
});

let dados = {
    id: 1,
    username: "test",
    passwd: "123",
    life: 5,
    points: 25
}


router.post('/userGet', (req, res) => {
    const { user, passwd } = req.body

    if (user === dados.username && passwd === dados.passwd) {

        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });

        res.json({
            sucesso: true,
            mensagem: "Login Aprovado!",
            token: token
        })

    } else {
        res.status(401).json({
            sucesso: false,
            mensagem: "Usuario ou senha incorreto!"
        })
    }
})


router.get('/private', verifyToken, (req, res) => {
    res.json({
        sucesso: true,
        mensagem: `Bem-vindo ${req.user.user}, você acessou uma rota protegida!`,
        life: `${dados.life} Vidas`,
        points: `${dados.points} pts`
    });
});

export default router;
