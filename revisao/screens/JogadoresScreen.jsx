import { StyleSheet, View, Image, FlatList } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'
import Ionicons from '@expo/vector-icons/Ionicons' // ou 'react-native-vector-icons/Ionicons'

export default function JogadoresScreen() {
  const jogadores = [
    {
      nome: "Gabriel Barbosa",
      numero: 9,
      imagem: "https://i.pinimg.com/474x/1d/9f/5d/1d9f5de58831c9913f925a7155bdc7da.jpg"
    },
    {
      nome: "Arrascaeta",
      numero: 14,
      imagem: "https://i.pinimg.com/474x/cf/ad/d9/cfadd92de5e581ac5505e3d325f8b9b2.jpg"
    },
    {
      nome: "Everton Ribeiro",
      numero: 7,
      imagem: "https://i.pinimg.com/236x/39/1a/27/391a275fb7e0b018f2900f0f9fc9331b.jpg"
    },
    {
      nome: "David Luiz",
      numero: 23,
      imagem: "https://i.pinimg.com/474x/98/79/9b/98799b86107a87b79dc9b15cf778fa4a.jpg"
    },
    {
      nome: "Pedro",
      numero: 21,
      imagem: "https://i.pinimg.com/474x/79/e6/18/79e6185649fa3667b3ed3beef3e1ae94.jpg"
    },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.imagem }} style={styles.imagem} resizeMode='contain' />
      <View style={styles.nomeContainer}>
        <Ionicons name="person-circle" size={20} color="#000" style={{ marginRight: 5 }} />
        <Text style={styles.nome}>{item.nome}</Text>
      </View>
      <Text style={styles.numero}>Camisa: {item.numero}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text variant='headlineLarge' style={styles.titulo}>Jogadores do Flamengo</Text>

      <FlatList
        data={jogadores}
        renderItem={renderItem}
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
    padding: 10,
    borderRadius: 10,
    width: '90%',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  imagem: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  nomeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  numero: {
    fontSize: 14,
    color: '#444',
  },
});
