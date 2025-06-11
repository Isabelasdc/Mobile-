/// src/screens/RegisterUserScreen.jsx
import React, { useState } from 'react';
import MaskInput from 'react-native-mask-input';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { saveUser } from '../utils/auth';

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
    if (!name || !age || !birthDate || !email || !password || !cpf) {
      alert('Preencha todos os campos obrigatórios.');
      return;
    }

    const cpfOnlyNumbers = cpf.replace(/\D/g, '');

    if (cpfOnlyNumbers.length !== 11) {
      alert('Digite um CPF válido com 11 dígitos.');
      return;
    }


    if (!termsAccepted) {
      alert('Você deve aceitar os termos de uso.');
      return;
    }

    setLoading(true);

    const userData = {
      name,
      age,
      birthDate,
      cpf: cpf.replace(/\D/g, ''), // Salva apenas números
      email,
      password,
      authenticated: true,
    };

    await saveUser(userData);

    // Vai pro Login após cadastro
    navigation.navigate('Login');
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

          <TextInput
            placeholder="Nome completo"
            value={name}
            onChangeText={setName}
            style={styles.input}
            autoCapitalize="words"
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Idade"
            value={age}
            onChangeText={(text) => {
              // Remove qualquer coisa que não seja número
              const onlyNumbers = text.replace(/[^0-9]/g, '');
              // Limita a 3 dígitos
              if (onlyNumbers.length <= 3) {
                setAge(onlyNumbers);
              }
            }}
            style={styles.input}
            keyboardType="numeric"
            maxLength={3} // Limita visualmente o input
            placeholderTextColor="#999"
          />

          <MaskInput
            mask={[/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]}
            placeholder="Data de nascimento (DD/MM/AAAA)"
            value={birthDate}
            onChangeText={(maskedText) => setBirthDate(maskedText)}
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <MaskInput
            mask={[
              /\d/, /\d/, /\d/,
              '.',
              /\d/, /\d/, /\d/,
              '.',
              /\d/, /\d/, /\d/,
              '-',
              /\d/, /\d/
            ]}
            placeholder="CPF"
            value={cpf}
            onChangeText={(maskedText) => setCpf(maskedText)}
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

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

          {/* Botão Registrar com loading */}
          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <>
                <ActivityIndicator size="small" color="#fff" />
                <Text style={styles.registerButtonText}>Registrando...</Text>
              </>
            ) : (
              <Text style={styles.registerButtonText}>Registrar</Text>
            )}
          </TouchableOpacity>

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
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
    fontSize: 16,
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
  },
  checkmark: {
    color: '#fff',
    fontSize: 18,
  },
  registerButton: {
    backgroundColor: '#28a745',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: 'row',
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6200ee',
    fontSize: 14,
  },
  termsText: {
    fontSize: 14,
    color: '#333',
  },
});