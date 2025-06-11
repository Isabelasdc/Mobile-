// src/services/boredApi.js
import axios from 'axios';

const BORED_API_URL = 'https://bored-api.appbrewery.com/random'; 

// Mapeia emoções detectadas pra tipos válidos da Bored API
export const emotionToActivityTypeMap = {
  feliz: 'recreational',
  animado: 'busywork',
  triste: 'education',
  cansado: 'relaxation',
  neutro: 'cooking',
  ansioso: 'relaxation',
  motivado: 'social',
  calmo: 'relaxation',
  irritado: 'busywork',
  default: 'any', // fallback
};

/**
 * Busca uma atividade aleatória com base na emoção detectada
 * @param {string} emotion - Emoção em português (ex: "feliz", "triste")
 * @returns {Promise<Object>} Atividade completa sugerida
 */
export const getSuggestionByEmotion = async (emotion) => {
  try {
    const activityType = emotionToActivityTypeMap[emotion.toLowerCase()] || emotionToActivityTypeMap.default;

    const url = activityType !== 'any'
      ? `${BORED_API_URL}?type=${activityType}`
      : BORED_API_URL;

    const response = await axios.get(url);

    return {
      activity: response.data.activity,
      type: response.data.type,
      participants: response.data.participants,
      price: response.data.price,
      accessibility: response.data.accessibility,
      duration: response.data.duration,
      link: response.data.link || undefined,
      key: response.data.key,
    };
  } catch (error) {
    console.error('Erro ao buscar sugestão:', error.message);
    return {
      activity: 'Não foi possível carregar uma atividade.',
      type: '',
      participants: '',
      price: '',
      accessibility: '',
      duration: '',
      link: '',
    };
  }
};