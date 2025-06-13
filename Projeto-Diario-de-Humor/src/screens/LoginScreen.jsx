// src/screens/LoginScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { useNavigation } from '@react-navigation/native';
import { getUser, saveUser } from '../utils/auth';
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); 
  
  const handleLogin = async () => {
    // Limpa a mensagem de erro anterior
    setErrorMessage('');

    // Validação de campos vazios
    if (!email || !password) {
      setErrorMessage('Email e senha são obrigatórios.');
      return;
    }

    setLoading(true);

    try {
        const storedUser = await getUser();

        if (!storedUser) {
          setErrorMessage('Nenhum usuário registrado. Faça o cadastro primeiro.');
          setLoading(false);
          return;
        }

        if (storedUser.email === email && storedUser.password === password) {
          await saveUser({ ...storedUser, authenticated: true });

          // Redireciona para Principal
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: 'Principal' }],
            })
          );
        } else {
          setErrorMessage('Email ou senha inválidos.');
        }
    } catch (error) {
        setErrorMessage('Ocorreu um erro ao tentar fazer login.');
    } finally {
        setLoading(false);
    }
  };

  return (
     <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/564x/03/96/3c/03963c43f74343980f57988ac19879f8.jpg',
      }}
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <Header title="Login" />
        <View style={styles.overlay}>
          {/* Título do App */}
          <Text style={styles.appTitle}>Diário de Humor</Text>

          {/* Campo Email */}
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />

          {/* Campo Senha */}
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#aaa"
          />

          {/* Mensagem de erro */}
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

          {/* Botão Entrar com loading */}
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
            <Text style={styles.loginButtonText}>
              {loading ? 'Carregando...' : 'Entrar'}
            </Text>
            {loading && <ActivityIndicator size="small" color="#fff" />}
          </TouchableOpacity>

          {/* Link para registro */}
          <TouchableOpacity onPress={() => navigation.navigate('RegisterUser')}>
            <Text style={styles.registerLink}>
              Não tem cadastro? Crie sua conta aqui!
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200ee',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#6200ee',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  registerLink: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6200ee',
    fontSize: 14,
  },
  // Novo estilo para a mensagem de erro
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14,
  },
});