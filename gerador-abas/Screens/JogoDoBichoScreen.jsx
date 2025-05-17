import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';

// Lista de animais do jogo do bicho
const animais = [
  {
    numero: 1,
    nome: 'Avestruz',
    imagem: 'https://i.pinimg.com/736x/ef/3a/bb/ef3abbbc39b3cacee1ba922f95f1b0cd.jpg',
  },
  {
    numero: 2,
    nome: 'Águia',
    imagem: 'https://i.pinimg.com/736x/88/04/3b/88043b814c6d4fef1f4aee14356c00b1.jpg',
  },
  {
    numero: 3,
    nome: 'Burro',
    imagem: 'https://i.pinimg.com/736x/bc/f3/ee/bcf3eee6436f220cb4d10962e394c741.jpg',
  },
  {
    numero: 4,
    nome: 'Borboleta',
    imagem: 'https://i.pinimg.com/736x/dc/91/91/dc91911cb150d57f2f43da7466d1ab4f.jpg',
  },
  {
    numero: 5,
    nome: 'Cachorro',
    imagem: 'https://i.pinimg.com/736x/82/fb/de/82fbde9c403d43ebc83d79414b9239c3.jpg',
  },
  {
    numero: 6,
    nome: 'Cabra',
    imagem: 'https://i.pinimg.com/736x/10/20/bb/1020bbf758fa245fff4c4b1276e83b8a.jpg',
  },
  {
    numero: 7,
    nome: 'Carneiro',
    imagem: 'https://i.pinimg.com/736x/ce/c4/e6/cec4e6c3f16a63f9a713267ffcf9e114.jpg',
  },
  {
    numero: 8,
    nome: 'Camelo',
    imagem: 'https://i.pinimg.com/736x/85/0b/11/850b11e4c316abfe126ff1866c2aaeb0.jpg',
  },
  {
    numero: 9,
    nome: 'Cobra',
    imagem: 'https://i.pinimg.com/736x/3d/d8/a5/3dd8a5e99264f67efae4074431262878.jpg',
  },
  {
    numero: 10,
    nome: 'Coelho',
    imagem: 'https://i.pinimg.com/736x/eb/17/8b/eb178b465704a327d3e954eef4c7e338.jpg',
  },
];

export default function GeradorBicho() {
    const [animalGerado, setAnimalGerado] = useState({});
  
    function sortearAnimal() {
      const index = Math.floor(Math.random() * animais.length);
      setAnimalGerado(animais[index]);
    }
  
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <Text variant="displaySmall" style={styles.title}>
              Gerador de Bicho
            </Text>
  
            {animalGerado.nome ? (
              <>
                <Text variant="headlineMedium" style={styles.animalName}>
                  {animalGerado.nome}
                </Text>
                <Card.Cover
                  source={{ uri: animalGerado.imagem }}
                  style={styles.animalImage}
                />
              </>
            ) : (
              <Text style={styles.instruction}>
                Pressione o botão para sortear um animal
              </Text>
            )}
          </Card.Content>
  
          <Card.Actions style={styles.cardActions}>
            <Button
              mode="contained"
              onPress={sortearAnimal}
              buttonColor="#6200ee"
              textColor="#fff"
              style={styles.button}
              contentStyle={{ paddingVertical: 8 }}
            >
              Sortear Animal
            </Button>
          </Card.Actions>
        </Card>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f4f6',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    card: {
      borderRadius: 16,
      elevation: 6,
      shadowColor: '#000',
      shadowOpacity: 0.15,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 5 },
      paddingBottom: 12,
    },
    cardContent: {
      alignItems: 'center',
      paddingVertical: 24,
    },
    title: {
      marginBottom: 16,
      fontWeight: 'bold',
      color: '#222',
    },
    animalName: {
      marginBottom: 16,
      color: '#444',
      fontWeight: '600',
    },
    animalImage: {
      width: '100%',
      height: 300,
      borderRadius: 16,
      elevation: 4,
      shadowColor: '#000',
      shadowOpacity: 0.25,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
    },
    instruction: {
      fontSize: 16,
      color: '#666',
      fontStyle: 'italic',
    },
    cardActions: {
      justifyContent: 'center',
      paddingHorizontal: 20,
      paddingTop: 10,
    },
    button: {
      width: '100%',
      borderRadius: 8,
    },
  });
  
  