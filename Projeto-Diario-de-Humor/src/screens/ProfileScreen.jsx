import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Button,
  ScrollView,
  Alert,
} from 'react-native';
import Header from '../components/Header';
import * as ImagePicker from 'expo-image-picker';
import { getUser, saveUser, logoutUser } from '../utils/auth';
import { useNavigation, CommonActions } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Ícone de lixeira

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    age: '',
    cpf: '',
    birthDate: '',
  });
  const [photo, setPhoto] = useState(null);
  const navigation = useNavigation();

  // Função para aplicar máscara no CPF
  const maskCPF = (text) => {
    return text
      .replace(/\D/g, '')
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{2})/, '$1-$2');
  };

  // Função para aplicar máscara na data
  const maskDate = (text) => {
    return text
      .replace(/\D/g, '')
      .slice(0, 8)
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2');
  };

  // Carrega os dados do usuário ao focar na tela
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      const storedUser = await getUser();
      if (storedUser) {
        setUserData({
          name: storedUser.name || '',
          email: storedUser.email || '',
          age: storedUser.age?.toString() || '',
          cpf: storedUser.cpf ? maskCPF(storedUser.cpf) : '',
          birthDate: storedUser.birthDate || '',
        });
        setPhoto(storedUser.photo || null);
      }
    });
    return unsubscribe;
  }, [navigation]);

  // --- CÓDIGO CORRIGIDO ---
  // Seleciona foto (sem salvar automaticamente)
const handleSelectPhoto = useCallback(async () => {
    try {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Sem permissão', 'Não foi possível acessar a galeria.');
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        // --- LINHA CORRIGIDA ---
        mediaTypes: ImagePicker.Images, // Correção aplicada aqui
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const source = result.assets[0].uri;
        setPhoto(source);
      }
    } catch (error) {
      console.error('Erro ao selecionar foto:', error.message);
      Alert.alert('Erro', 'Houve um problema ao abrir a galeria.');
    }
  }, []);// A dependência [userData] foi removida, pois não é mais necessária aqui.

  // Salva as alterações feitas no perfil
  const handleSaveChanges = useCallback(async () => {
    const profileToSave = { ...userData, photo };
    await saveUser(profileToSave);
    setIsEditing(false);
    Alert.alert('Sucesso', 'Seu perfil foi atualizado!');
  }, [userData, photo]);

  // Sai da conta e volta para o Login
const handleLogout = useCallback(async () => {
  await logoutUser(); // <- usa a função segura

  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    })
  );
}, [navigation]);



  // Exclui a conta (impede login novamente)
  const handleDeleteAccount = useCallback(async () => {
    await saveUser({ ...userData, photo, authenticated: false, deleted: true });
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      })
    );
  }, [navigation, userData, photo]);

  return (
    <View style={styles.container}>
      <Header title="Meu Perfil" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Cabeçalho com Foto + Botão Excluir */}
        <View style={styles.headerTop}>
          <TouchableOpacity
            style={styles.photoContainer}
            onPress={() => {
              if (!isEditing) {
                Alert.alert('Modo Edição', 'Ative o modo edição para alterar sua foto.');
                return;
              }
              handleSelectPhoto();
            }}
          >
            {photo ? (
              <Image source={{ uri: photo }} style={styles.avatar} />
            ) : (
              <Text style={styles.addPhotoText}>Adicionar foto</Text>
            )}
            {isEditing && <Text style={styles.editPhotoHint}>Toque para alterar</Text>}
          </TouchableOpacity>

          {/* Botão de Excluir Conta com Ícone */}
          <TouchableOpacity
            style={styles.deleteButtonTop}
            onPress={() => {
              Alert.alert(
                'Excluir conta',
                'Tem certeza que deseja excluir sua conta? Você não poderá acessar novamente.',
                [
                  { text: 'Cancelar', style: 'cancel' },
                  {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: handleDeleteAccount,
                  },
                ]
              );
            }}
            accessibilityLabel="Excluir conta"
          >
            <MaterialIcons name="delete" size={24} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Nome */}
        <Text style={styles.label}>Nome:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => setUserData(prev => ({ ...prev, name: text }))}
            placeholder="Seu nome completo"
          />
        ) : (
          <Text style={styles.value}>{userData.name || 'Não informado'}</Text>
        )}

        {/* Email */}
        <Text style={styles.label}>E-mail:</Text>
        <Text style={styles.value}>{userData.email || 'Não informado'}</Text>

        {/* CPF */}
        <Text style={styles.label}>CPF:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userData.cpf}
            onChangeText={(text) => setUserData(prev => ({ ...prev, cpf: maskCPF(text) }))}
            placeholder="XXX.XXX.XXX-XX"
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{userData.cpf || 'Não informado'}</Text>
        )}

        {/* Data de Nascimento */}
        <Text style={styles.label}>Data de Nascimento:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userData.birthDate}
            onChangeText={(text) => setUserData(prev => ({ ...prev, birthDate: maskDate(text) }))}
            placeholder="DD/MM/AAAA"
            keyboardType="numeric"
          />
        ) : (
          <Text style={styles.value}>{userData.birthDate || 'Não informado'}</Text>
        )}

        {/* Idade */}
        <Text style={styles.label}>Idade:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={userData.age}
            onChangeText={(text) => {
              const onlyNumbers = text.replace(/[^0-9]/g, '');
              if (onlyNumbers.length <= 3) {
                setUserData(prev => ({ ...prev, age: onlyNumbers }));
              }
            }}
            placeholder="Sua idade"
            keyboardType="numeric"
            maxLength={3}
          />
        ) : (
          <Text style={styles.value}>{userData.age ? `${userData.age} anos` : 'Não informado'}</Text>
        )}

        {/* Botões de Editar/Salvar */}
        <View style={styles.mainActions}>
          {isEditing ? (
            <Button title="Salvar Alterações" onPress={handleSaveChanges} color="#6200ee" />
          ) : (
            <Button title="Editar Perfil" onPress={() => setIsEditing(true)} />
          )}
        </View>

        {/* Botão de Logout */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Sair da conta</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { alignItems: 'center', padding: 20 },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  photoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: { width: 120, height: 120, borderRadius: 60 },
  addPhotoText: { color: '#6200ee', fontWeight: 'bold' },
  editPhotoHint: {
    position: 'absolute',
    bottom: -15,
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  deleteButtonTop: {
    backgroundColor: '#d32f2f',
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 44,
    height: 44,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: { width: '100%', fontSize: 14, color: '#888', marginTop: 20 },
  value: {
    width: '100%',
    fontSize: 18,
    color: '#333',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  input: {
    width: '100%',
    fontSize: 18,
    color: '#333',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  mainActions: { width: '100%', marginTop: 40 },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#ef5350',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});