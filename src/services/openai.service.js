/***
 * Configuração com o serviço da opem AI
 */

import { OpenAI } from 'openai';

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export async function gerarPergunta(prompt) {

  const resposta = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });

  const texto = resposta.choices[0].message.content;

  try {
    return JSON.parse(texto);
  } catch (e) {
    console.error('Erro ao interpretar JSON:', texto);
    throw new Error('Resposta inválida da IA');
  }
}