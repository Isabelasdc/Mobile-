import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Header from '../components/Header';

export default function ProfileScreen() {
  return (
    <>
      <Header title="Meu Perfil" />
      <View style={styles.container}>
        <Text style={styles.title}>⚙️ Configurações do Usuário</Text>
        <Text style={styles.subtitle}>
          Nome: Bruno
        </Text>
        <Text style={styles.subtitle}>
          E-mail: bruno@email.com
        </Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
});