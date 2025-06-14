import express from 'express';

const router = express.Router();

// router.use(express.json())

router.get('/test', (req, res) => {
  res.json({ mensagem: 'API do Academy está online!, endpoit: users' });
});

router.post('/userGet', (res, req) => {
    const {user, passwd} = req.body

    if (user === "test" && passwd === "123") {
        res.json({
            sucesso: true, mensagem: "Login Aprovado!"
        })
    } else {
        res.status(401).json({
            sucesso: false, mensagem: "Usuario ou senha incorreto!"
        })
    }

})
export default router;
