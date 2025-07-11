/**
 * Rota para acesso à API da openAI
 */

import express from 'express';
import { gerarPergunta } from '../services/openai.service.js';

const router = express.Router();

router.get('/test', (req, res) => {
  res.json({ mensagem: 'API do Academy está online!' });
});

router.post('/', async (req, res) => {

  const prompt = req.body.prompt;

  if (!prompt) {
    return res.status(400).json({ erro: 'Prompt é obrigatório' });
  }

  try {
    const pergunta = await gerarPergunta(prompt);
    const { correta, ...semResposta } = pergunta;
    res.json(semResposta);
  } catch (e) {
    res.status(500).json({ erro: e.message });
  }
});


export default router;
