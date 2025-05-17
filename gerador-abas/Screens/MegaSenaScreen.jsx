import React, { useState } from "react";
import { FlatList, View } from "react-native";
import { Button, Card, Text } from "react-native-paper";

export default function MegaSenaScreen() {
  const [jogoGerado, setJogoGerado] = useState([]);
  const [jogosMegaSena, setJogosMegaSena] = useState([]);

  function gerarJogo() {
    let numeros = [];
    while (numeros.length < 6) {
      let numero = Math.floor(Math.random() * 60) + 1;
      if (!numeros.includes(numero)) {
        numeros.push(numero);
      }
    }
    numeros.sort((a, b) => a - b);
    setJogoGerado(numeros);
    setJogosMegaSena([...jogosMegaSena, numeros]);
  }

  function resetar() {
    setJogoGerado([]);
    setJogosMegaSena([]);
  }

  return (
    <View style={{ padding: 16 }}>
      <Card>
        <Card.Content>
          <Text variant="headlineMedium">Mega Sena</Text>
          <Text variant="titleLarge">Jogo atual:</Text>

          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginVertical: 8,
            }}
          >
            {(jogoGerado.length === 0 ? Array(6).fill("?") : jogoGerado).map(
              (numero, i) => (
                <View
                  key={i}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: "#ddd",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontWeight: "bold" }}>{numero}</Text>
                </View>
              )
            )}
          </View>
        </Card.Content>

        <Card.Actions>
          <Button onPress={gerarJogo}>Gerar</Button>
          <Button onPress={resetar}>Resetar</Button>
        </Card.Actions>

        <Card.Content>
          <Text variant="titleMedium">Histórico de jogos:</Text>

          <FlatList
            data={jogosMegaSena}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item: jogo, index }) => (
              <View style={{ marginVertical: 6 }}>
                <Text variant="bodyMedium">Jogo {index + 1}:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 8,
                    marginTop: 4,
                  }}
                >
                  {jogo.map((numero, i) => (
                    <View
                      key={i}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 20,
                        backgroundColor: "#cce5ff",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text style={{ fontWeight: "bold" }}>{numero}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}
            showsVerticalScrollIndicator={false}
          />
        </Card.Content>
      </Card>
    </View>
  );
}
