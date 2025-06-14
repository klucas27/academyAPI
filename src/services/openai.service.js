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


// import { OpenAI } from 'openai';
// import JSON5 from 'json5';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// export async function gerarPergunta(prompt) {
//   const resposta = await openai.chat.completions.create({
//     model: 'gpt-3.5-turbo',
//     messages: [{ role: 'user', content: prompt }],
//     temperature: 0.7
//   });

//   const texto = resposta.choices[0].message.content;

//   try {
//     // Extrai o JSON bruto
//     const match = texto.match(/\{[\s\S]*?\}/);
//     if (!match) throw new Error('JSON não encontrado na resposta da IA.');
//     // Usa JSON5 para tolerar aspas e quebras de linha
//     return JSON5.parse(match[0]);
//   } catch (e) {
//     console.error('Erro ao interpretar JSON:', texto);
//     throw new Error('Resposta inválida da IA');
//   }
// }
