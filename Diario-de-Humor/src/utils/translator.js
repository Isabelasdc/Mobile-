// src/utils/translator.js

export const mapTypeToPortuguese = (type) => {
  const typeMap = {
    recreational: 'Recreação',
    education: 'Educação',
    social: 'Social',
    diy: 'Faça você mesmo',
    cooking: 'Cozinha',
    relaxation: 'Relaxamento',
    music: 'Música',
    busywork: 'Trabalho',
    charity: 'Voluntariado',
    default: 'qualquer',
  };
  return typeMap[type] || type;
};


export const getDurationText = (duration) => {
  const durationMap = {
    seconds: 'segundos',
    minutes: 'minutos',
    hours: 'horas',
    days: 'dias',
    weeks: 'semanas',
  };
  return durationMap[duration] || duration;
};

export const getPriceText = (value) => {
  if (value <= 0.3) return 'Baixo';
  if (value <= 0.6) return 'Médio';
  return 'Alto';
};