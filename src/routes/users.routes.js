/**
 * Rota para acesso aos usuarios, contendo endpoits para registro, consultas, atualizações e feedbacks enviado
 */

import express from 'express';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { insertUser, getUserByUsername, updateUserData } from '../database/userBD.js';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';


const router = express.Router();
const SECRET_KEY = process.env.JWT_SECRET || "KFJJWJEI83283UFH@@KFJU84]";

router.use(express.json());

router.get('/test', (req, res) => {
    res.json({ mensagem: 'API do Academy está online!, endpoint: users' });
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
            console.log(err);
            return res.status(500).json({ sucesso: false, mensagem: "Erro interno ao buscar usuário." });
        }

        if (!usuario) {
            return res.status(401).json({ sucesso: false, mensagem: "Usuário ou senha incorretos!" });
        }

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
    const user = req.user.user;

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
                life: usuario.life,
                points: usuario.points
            }
        });
    });
});


// update dos pontos e vidas dos usuarios
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


// rota para enviar email de feedback
router.post('/feedback', async (req, res) => {
    const { nome, email, escola, assunto, mensagem, nota_plataforma } = req.body;

    if (!nome || !email || !escola || !assunto || !mensagem || !nota_plataforma) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'Gmail', // ou Outlook, SMTP personalizado...
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        await transporter.sendMail({
            from: `"Academy Feedback" <${process.env.EMAIL_USER}>`,
            to: "kresleylucas.r@gmail.com",
            subject: "Novo feedback recebido",
            text: `Nome: ${nome}\n
            Email: ${email}\n
            Escola:${escola}\n
            Assunto:${assunto}\n
            Mensagem: ${mensagem}\n
            Nota da Plataforma: ${nota_plataforma}\n
            `
        });

        res.json({ mensagem: "Feedback enviado com sucesso!" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ mensagem: "Erro ao enviar e-mail." });
    }
});

export default router;
