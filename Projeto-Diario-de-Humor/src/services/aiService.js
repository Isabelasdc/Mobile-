// src/services/aiService.js
import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDIDxjL9agYji3v5i_ZcVYcHLcIOv2xLLI'; // Lembre-se de colocar sua chave aqui
// URL atualizada para o modelo mais recente e eficiente
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

/**
 * Função central para fazer chamadas à API do Gemini.
 * @param {string} prompt - O prompt a ser enviado para a IA.
 * @param {object} generationConfig - As configurações de geração de conteúdo.
 * @returns {Promise<string|null>} O texto da resposta da IA ou null em caso de erro.
 */
const callGeminiAPI = async (prompt, generationConfig) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig,
      },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
    return response.data.candidates?.[0]?.content?.parts?.[0]?.text.trim() || null;
  } catch (error) {
    console.error('❌ Erro na chamada da API Gemini:', error.response?.data || error.message);
    throw error; // Lança o erro para que a função que chamou possa tratá-lo.
  }
};

/**
 * Analisa o texto e retorna a emoção predominante.
 * @param {string} description - Texto digitado pelo usuário.
 * @returns {Promise<string>} Emoção detectada.
 */
export const analyzeMoodWithGemini = async (description) => {
  const prompt = `Analise o seguinte diário do usuário e retorne apenas uma emoção em português. Exemplos: feliz, triste, neutro, cansado, motivado, ansioso...\n\nDiário:\n"${description}"\n\nResposta (apenas uma emoção):`;
  try {
    const result = await callGeminiAPI(prompt, { maxOutputTokens: 10, temperature: 0.4 });
    return result?.toLowerCase() || 'neutro';
  } catch (error) {
    return 'neutro'; // Retorna um valor padrão em caso de erro.
  }
};

/**
 * Gera uma reflexão com base no humor detectado.
 * @param {string} emotion - Emoção detectada (ex.: "alegre", "triste").
 * @param {string} description - Descrição escrita pelo usuário.
 * @returns {Promise<string>} Reflexão gerada pela IA.
 */
export const generateReflectionWithGemini = async (emotion, description = '') => {
  const prompt = `Você é um assistente compassivo. Com base na emoção "${emotion}" e na descrição "${description}", gere uma reflexão curta, positiva e encorajadora de 2 a 3 frases em português.`;
  try {
    const result = await callGeminiAPI(prompt, { maxOutputTokens: 150, temperature: 0.7 });
    return result || 'Cada dia é uma nova chance para recomeçar.';
  } catch (error) {
    return 'Lembre-se de ser gentil com você mesmo hoje.';
  }
};

/**
 * Gera uma dica curta e inspiradora para o dia.
 * @returns {Promise<string>} Uma dica do dia.
 */
export const generateDailyTipWithGemini = async () => {
  const prompt = "Me dê uma dica curta, prática e inspiradora para o bem-estar e saúde mental, em português, com no máximo duas frases.";
  try {
    const result = await callGeminiAPI(prompt, { maxOutputTokens: 100, temperature: 0.8 });
    return result || 'Respire fundo por um minuto. Pequenas pausas fazem uma grande diferença.';
  } catch (error) {
    return 'Abrace o processo e confie na sua jornada.';
  }
};

/**
 * Traduz um texto do inglês pro português usando Gemini.
 * @param {string} text - Texto em inglês.
 * @returns {Promise<string>} Texto traduzido.
 */
export const translateToPortuguese = async (text) => {
  const prompt = `Traduza a seguinte atividade para o português do Brasil:\n"${text}"\n\nResposta (apenas o texto traduzido):`;
  try {
    const result = await callGeminiAPI(prompt, { maxOutputTokens: 100, temperature: 0.3 });
    return result || text; // Se a tradução falhar, retorna o texto original.
  } catch (error) {
    return text; // Retorna o texto original em caso de erro.
  }
};