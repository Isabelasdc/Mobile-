import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_KEY = '@DiarioDeHumor:usuario'; // Chave um pouco mais específica

/**
 * Salva os dados do usuário no armazenamento local.
 * @param {object} userData - O objeto do usuário a ser salvo. Ex: { id, name, email, authenticated: true }
 * @returns {Promise<void>}
 */
export const saveUser = async (userData) => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem(USER_KEY, jsonValue);
  } catch (error) {
    console.error('Erro ao salvar os dados do usuário:', error);
  }
};

/**
 * Busca os dados do usuário salvos localmente.
 * @returns {Promise<object|null>} O objeto do usuário ou null se não houver usuário salvo.
 */
export const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_KEY);
    const user = jsonValue != null ? JSON.parse(jsonValue) : null;

    if (user) {
      // Garante que authenticated seja booleano
      user.authenticated = Boolean(user.authenticated);
      user.deleted = Boolean(user.deleted);
    }

    return user;
  } catch (error) {
    console.error('Erro ao carregar os dados do usuário:', error);
    return null;
  }
};

/**
 * Remove os dados do usuário do armazenamento (função base).
 * @returns {Promise<void>}
 */
export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem(USER_KEY);
  } catch (error) {
    console.error('Erro ao remover os dados do usuário:', error);
  }
};

/**
 * NOVO: Verifica se o usuário está salvo e autenticado.
 * Muito útil para roteamento inicial no App.js.
 * @returns {Promise<boolean>} True se o usuário estiver logado, false caso contrário.
 */
export const isUserLoggedIn = async () => {
  try {
    const user = await getUser();
    return !!user && user.authenticated && !user.deleted;
  } catch (error) {
    return false;
  }
};

export const logoutUser = async () => {
  try {
    const user = await getUser();
    if (user) {
      await saveUser({ ...user, authenticated: false });
    }
  } catch (error) {
    console.error('Erro ao fazer logout:', error);
  }
};