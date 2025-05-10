import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const titulos = [
  { nome: "Campeonato Brasileiro", anos: [1980, 1982, 1983, 1992, 2009, 2019, 2020] },
  { nome: "Copa Libertadores da América", anos: [1981, 2019, 2022] },
  { nome: "Copa do Brasil", anos: [1990, 2006, 2013, 2022, 2024] },
  { nome: "Supercopa do Brasil", anos: [2020, 2021, 2025] }
];

export default function TitulosScreen() {
  return (
    <FlatList
      data={titulos}
      renderItem={({ item, index }) => (
        <View style={styles.card} key={index}>
          <Text style={styles.title}>{item.nome}</Text>
          <Text>Anos: {item.anos.join(", ")}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, borderBottomWidth: 1 },
  title: { fontSize: 18, fontWeight: 'bold' }
});
