import express from 'express';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ mensagem: 'API do Academy está online!' });
});


export default router;
