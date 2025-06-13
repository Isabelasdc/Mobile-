/// src/screens/RegisterUserScreen.jsx
import React, { useState } from 'react';
import MaskInput, { createNumberMask } from 'react-native-mask-input';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
  Alert, // Usar Alert para uma melhor experiência
} from 'react-native';
import Header from '../components/Header';
import { saveUser } from '../utils/auth';

// Máscara para e-mail: permite caracteres comuns em e-mails.
// É uma máscara flexível que não impõe uma estrutura rígida,
// mas guia o usuário a inserir os caracteres corretos.
const emailMask = (text = '') => {
  const mask = [];
  // Permite até 64 caracteres para a parte local (antes do @)
  for (let i = 0; i < 64; i++) {
    mask.push(/[a-zA-Z0-9_.-]/);
  }
  // Permite o @
  mask.push('@');
  // Permite até 255 caracteres para o domínio
  for (let i = 0; i < 255; i++) {
    mask.push(/[a-zA-Z0-9.-]/);
  }
  return mask;
};


export default function RegisterUserScreen({ navigation }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cpf, setCpf] = useState('');

  const handleRegister = async () => {
    // 1. Validação de campos
    if (!name || !age || !birthDate || !email || !password || !cpf) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    // 2. Validação de CPF
    const cpfOnlyNumbers = cpf.replace(/\D/g, '');
    if (cpfOnlyNumbers.length !== 11) {
      Alert.alert('Erro', 'Digite um CPF válido com 11 dígitos.');
      return;
    }
    
    // 3. Validação de E-mail com Regex (mais seguro que a máscara)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
        return;
    }


    // 4. Validação dos termos
    if (!termsAccepted) {
      Alert.alert('Atenção', 'Você deve aceitar os termos e condições para continuar.');
      return;
    }

    setLoading(true);

    const userData = {
      name,
      age,
      birthDate,
      cpf: cpfOnlyNumbers, // Salva apenas números
      email,
      password,
      authenticated: true,
    };

    try {
        await saveUser(userData);
        Alert.alert('Sucesso!', 'Seu cadastro foi realizado com sucesso.');
        // Vai pro Login após cadastro
        navigation.navigate('Login');
    } catch (error) {
        console.error("Erro ao salvar usuário:", error);
        Alert.alert('Erro', 'Não foi possível completar o seu cadastro. Tente novamente.');
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
      <View style={styles.container}>
        <Header title="Cadastro" />

        <View style={styles.overlay}>
          <Text style={styles.subtitle}>Crie sua conta</Text>

          {/* Nome completo */}
          <TextInput
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
            placeholderTextColor="#999"
          />

          {/* Idade */}
          <TextInput
            placeholder="Idade"
            value={age}
            onChangeText={(text) => {
              const onlyNumbers = text.replace(/[^0-9]/g, '');
              if (onlyNumbers.length <= 3) {
                setAge(onlyNumbers);
              }
            }}
            style={styles.input}
            keyboardType="numeric"
            maxLength={3}
            placeholderTextColor="#999"
          />

          {/* Data de Nascimento */}
          <MaskInput
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            placeholder="Data de nascimento (DD/MM/AAAA)"
            value={birthDate}
            onChangeText={(maskedText) => setBirthDate(maskedText)}
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          {/* CPF */}
          <MaskInput
            mask={[
              /\d/, /\d/, /\d/, '.',
              /\d/, /\d/, /\d/, '.',
              /\d/, /\d/, /\d/, '-',
              /\d/, /\d/
            ]}
            placeholder="CPF"
            value={cpf}
            onChangeText={(maskedText) => setCpf(maskedText)}
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          {/* E-mail com Máscara */}
          <MaskInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            mask={emailMask}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          {/* Senha */}
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          {/* Termos e Condições */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={[
                styles.checkbox,
                termsAccepted && styles.checkboxChecked,
              ]}
              onPress={() => setTermsAccepted(!termsAccepted)}
            >
              {termsAccepted && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.termsText}>Aceito os termos e condições</Text>
          </View>

          {/* Botão Registrar */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color="#fff" style={{marginRight: 8}} />
                <Text style={styles.registerButtonText}>Registrando...</Text>
              </>
            ) : (
              <Text style={styles.registerButtonText}>Registrar</Text>
            )}
          </TouchableOpacity>

          {/* Link para Login */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Já tem conta? Faça login</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  subtitle: {
    fontSize: 24,
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
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333'
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  checkmark: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    backgroundColor: '#28a745',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6200ee',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  termsText: {
    fontSize: 14,
    color: '#333',
  },
});
