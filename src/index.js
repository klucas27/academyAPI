// src/index.js

import './loadEnv.js'

import express from 'express';
import cors  from 'cors'
import desafioRoutes from './routes/desafio.routes.js';


// console.log("Chave OpenAI:", process.env.OPENAI_API_KEY);  // Adicione isso para verificar se a chave está sendo carregada

const app = express();

const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'https://academygame.netlify.app/',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false
}));

app.use(express.json());

app.use('/api', desafioRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
