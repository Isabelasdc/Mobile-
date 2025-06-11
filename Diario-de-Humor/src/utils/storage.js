// src/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'diarioDeHumor';

/**
 * Salva um novo registro no histórico
 * @param {Object} record - Objeto com os dados do registro
 */
export const saveMoodRecord = async (record) => {
  try {
    const records = await getMoodRecords();
    records.push(record);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    console.log('✅ Registro salvo:', record);
  } catch (error) {
    console.error('❌ Erro ao salvar registro:', error.message);
  }
};

/**
 * Retorna todos os registros salvos
 * @returns {Promise<Array>}
 */
export const getMoodRecords = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    const records = data ? JSON.parse(data) : [];
    console.log(`📂 ${records.length} registros carregados`);
    return records;
  } catch (error) {
    console.error('❌ Erro ao carregar registros:', error.message);
    return [];
  }
};

/**
 * Atualiza um registro existente
 * @param {string} id - ID do registro
 * @param {Object} updatedData - Dados atualizados
 */
export const updateMoodRecord = async (id, updatedData) => {
  try {
    const records = await getMoodRecords();
    const updatedRecords = records.map((record) =>
      record.id === id ? { ...record, ...updatedData } : record
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
    console.log('🔄 Registro atualizado:', updatedData);
  } catch (error) {
    console.error('❌ Erro ao atualizar registro:', error.message);
  }
};

/**
 * Remove um registro pelo ID
 * @param {string} id - ID do registro
 */
export const deleteMoodRecord = async (id) => {
  try {
    const records = await getMoodRecords();
    const filteredRecords = records.filter((record) => record.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRecords));
    console.log('🗑️ Registro excluído:', id);
  } catch (error) {
    console.error('❌ Erro ao excluir registro:', error.message);
  }
};