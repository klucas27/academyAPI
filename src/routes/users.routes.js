import express from 'express';

import jwt from 'jsonwebtoken';

import { verifyToken } from '../middlewares/auth.middleware.js';

import {        // importação de configs do BD
    insertUser,
    getUserByUsername,
    updateUserData
} from '../database/userBD.js';


import bcrypt from 'bcrypt';

const router = express.Router();

const SECRET_KEY = process.env.JWT_SECRET || "KFJJWJEI83283UFH@@KFJU84]";

router.use(express.json())

router.get('/test', (req, res) => {
    res.json({ mensagem: 'API do Academy está online!, endpoit: users' });
});


// ROTA PARA REGISTRAR USUARIO!
router.post('/register', async (req, res) => {
    let { username, passwd } = req.body;

    if (!username || !passwd) {
        return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos." });
    }

    try {

        const hashedPassword = await bcrypt.hash(passwd, 10);

        insertUser({ username, hashedPassword }, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(409).json({ sucesso: false, mensagem: "Usuário já existe!" });
                }
                return res.status(500).json({ sucesso: false, mensagem: "Erro ao registrar usuário." });
            }

            res.status(201).json({ sucesso: true, mensagem: "Usuário registrado com sucesso!" });
        });

    } catch (err) {
        res.status(500).json({ sucesso: false, mensagem: "Erro interno. -rota" });
    }
});


// ROTA PARA VERIFICAR USUARIO!
router.post('/userGet', async (req, res) => {
    const { user, passwd } = req.body;

    if (!user || !passwd) {
        return res.status(400).json({ sucesso: false, mensagem: "Preencha todos os campos." });
    }

    getUserByUsername(user, async (err, usuario) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ sucesso: false, mensagem: "Erro interno ao buscar usuário." });
        }

        if (!usuario) {
            return res.status(401).json({ sucesso: false, mensagem: "Usuário ou senha incorretos!" });
        }

        // Corrigido: o campo correto é 'passwd'
        const senhaCorreta = await bcrypt.compare(passwd, usuario.passwd);

        if (!senhaCorreta) {
            return res.status(401).json({ sucesso: false, mensagem: "Usuário ou senha incorretos!" });
        }

        const token = jwt.sign({ user }, SECRET_KEY, { expiresIn: "1h" });

        res.json({
            sucesso: true,
            mensagem: "Login aprovado!",
            token: token,
            usuario: {
                id: usuario.id,
                username: usuario.username,
                life: usuario.life,
                points: usuario.points
            }
        });
    });
});

// ROTA PRIVADA COM TOKEN PARA VERIFICAÇÃO
router.get('/private', verifyToken, (req, res) => {

    const user = req.user.user

    getUserByUsername(user, async (err, usuario) => {
        if (err) {
            return res.status(500).json({ sucesso: false, mensagem: "Erro interno ao buscar usuário." });
        }

        if (!usuario) {
            return res.status(401).json({ sucesso: false, mensagem: "Usuário ou senha incorretos!" });
        }

        res.json({
            sucesso: true,
            mensagem: `Bem-vindo ${req.user.user}, você acessou uma rota protegida!`,
            usuario: {
                id: usuario.id,
                username: usuario.username,
                life: `${usuario.life} Vidas`,
                points: `${usuario.points} Pts`
            }
        });
    });
});

router.post('/updateStats', verifyToken, (req, res) => {
    const { username, life, points } = req.body;

    if (!username) {
        return res.status(400).json({ sucesso: false, mensagem: "Dados incompletos." });
    }

    updateUserData(username, life, points, (err, result) => {
        if (err) {
            return res.status(500).json({ sucesso: false, mensagem: "Erro ao atualizar usuário." });
        }

        res.json({ sucesso: true, mensagem: "Dados atualizados com sucesso!" });
    });
});


export default router;
