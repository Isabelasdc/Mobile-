// src/services/aiService.js
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDIDxjL9agYji3v5i_ZcVYcHLcIOv2xLLI';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'; 

/**
 * Analisa o texto escrito pelo usuário e retorna a emoção predominante
 * @param {string} description - Texto digitado pelo usuário
 * @returns {Promise<string>} Emoção detectada (ex: "feliz", "triste")
 */
export const analyzeMoodWithGemini = async (description) => {
  try {
    const prompt = `
Analise o seguinte diário do usuário e retorne apenas uma emoção em português.
Exemplos: feliz, triste, neutro, cansado, motivado, ansioso...

Diário:
"${description}"

Resposta (apenas uma emoção):
`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
            role: 'user',
          },
        ],
        generationConfig: {
          maxOutputTokens: 10,
          temperature: 0.4,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text.trim().toLowerCase() ||
      'neutro'
    );
  } catch (error) {
    console.error('❌ Erro ao analisar humor com Gemini:', error.message);
    console.error('Detalhes:', error.response?.data || 'Sem resposta');
    return 'neutro';
  }
};

/**
 * Gera uma reflexão com base no humor detectado
 * @param {string} moodLevel - Nível de humor (ex.: "alegre", "triste")
 * @param {string} description - Descrição escrita pelo usuário
 * @returns {Promise<string>} Reflexão gerada pela IA
 */
export const generateReflectionWithGemini = async (moodLevel, description = '') => {
  try {
    const prompt = `Você é um assistente compassivo que ajuda pessoas a refletirem sobre seus dias.
Com base no nível de humor "${moodLevel}" e na descrição "${description}",
gere uma reflexão curta e positiva para animar a pessoa.`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
            role: 'user',
          },
        ],
        generationConfig: {
          maxOutputTokens: 80,
          temperature: 0.7,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text.trim() ||
      'Reflexão não disponível.'
    );
  } catch (error) {
    console.error('❌ Erro ao gerar reflexão com Gemini:', error.message);
    console.error('Resposta completa:', error.response?.data);
    return 'Erro ao gerar reflexão. Tente novamente mais tarde.';
  }
};

/**
 * Traduz um texto do inglês pro português usando Gemini
 * @param {string} text - Texto em inglês
 * @returns {Promise<string>} Texto traduzido
 */
export const translateToPortuguese = async (text) => {
  try {
    const prompt = `
Traduza a seguinte atividade para o português do Brasil:
"${text}"

Resposta (apenas o texto traduzido):
`;

    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: prompt }],
            role: 'user',
          },
        ],
        generationConfig: {
          maxOutputTokens: 100,
          temperature: 0.3,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return (
      response.data.candidates?.[0]?.content?.parts?.[0]?.text.trim() ||
      text // Fallback se falhar
    );
  } catch (error) {
    console.error('❌ Erro ao traduzir:', error.message);
    return text;
  }
};