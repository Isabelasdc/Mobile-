import { StyleSheet, View, Image } from 'react-native'
import React from 'react'
import { Text } from 'react-native-paper'

export default function EscudoScreen() {
  const time = {
    nome: "Flamengo",
    escudo: "https://i.pinimg.com/236x/16/db/d2/16dbd20fd582e025dc54cc3fbd1839c9.jpg",
  };

  return (
    <View style={styles.container}>
      <Text variant='headlineLarge' style={styles.nome}>{time.nome}</Text>
      <Image
        source={{ uri: time.escudo }}
        style={styles.escudo}
        resizeMode='contain'
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  nome: {
    textAlign: 'center',
    marginBottom: 20,
  },
  escudo: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
})
