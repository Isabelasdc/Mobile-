import { StyleSheet, View, FlatList } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

export default function TitulosScreen() {
  const titulos = [
    {
      nome: "Campeonato Brasileiro",
      anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020],
    },
    {
      nome: "Copa Libertadores da América",
      anos: [1981, 2019, 2022],
    },
    {
      nome: "Copa do Brasil",
      anos: [1990, 2006, 2013, 2022, 2024],
    },
    {
      nome: "Supercopa do Brasil",
      anos: [2020, 2021, 2025],
    },
  ];

  return (
    <View style={styles.container}>
      <Text variant='headlineLarge' style={styles.titulo}>Títulos do Flamengo</Text>

      <FlatList
        data={titulos}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            {item.anos.map((ano, index) => (
              <Text key={index} style={styles.ano}>🏆 {ano}</Text>
            ))}
          </View>
        )}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    paddingTop: 40,
  },
  titulo: {
    textAlign: 'center',
    marginBottom: 20,
  },
  lista: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '90%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  ano: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
});
