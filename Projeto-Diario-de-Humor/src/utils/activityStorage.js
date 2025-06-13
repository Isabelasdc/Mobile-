// src/utils/activityStorage.js

import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'sugestoesDeAtividades';

/**
 * Salva um novo registro de atividade.
 * @param {Object} record - O objeto da atividade a ser salvo.
 */
export const saveActivityRecord = async (record) => {
  try {
    const records = await getActivityRecords();
    records.push(record);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    console.log('✅ Atividade salva:', record);
  } catch (error) {
    console.error('❌ Erro ao salvar atividade:', error.message);
  }
};

/**
 * Retorna todos os registros de atividades.
 * @returns {Promise<Array>} Uma lista de atividades.
 */
export const getActivityRecords = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const records = data ? JSON.parse(data) : [];
    console.log(`📂 ${records.length} atividades carregadas.`);
    return records;
  } catch (error) {
    console.error('❌ Erro ao carregar atividades:', error.message);
    return [];
  }
};

/**
 * Atualiza uma atividade existente pelo seu ID.
 * @param {string} id - O ID da atividade a ser atualizada.
 * @param {Object} updatedData - Os novos dados para a atividade.
 */
export const updateActivityRecord = async (id, updatedData) => {
  try {
    const records = await getActivityRecords();
    const updatedRecords = records.map((record) =>
      record.id === id ? { ...record, ...updatedData } : record
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    console.log('🔄 Atividade atualizada:', updatedData);
  } catch (error) {
    console.error('❌ Erro ao atualizar atividade:', error.message);
  }
};

/**
 * Remove uma atividade pelo seu ID.
 * @param {string} id - O ID da atividade a ser excluída.
 */
export const deleteActivityRecord = async (id) => {
  try {
    const records = await getActivityRecords();
    const filteredRecords = records.filter((record) => record.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecords));
    console.log('🗑️ Atividade excluída:', id);
  } catch (error) {
    console.error('❌ Erro ao excluir atividade:', error.message);
  }
};