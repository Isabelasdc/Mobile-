import { StyleSheet, Text, View, ScrollView } from 'react-native';
import React from 'react';
import { Button, Card } from 'react-native-paper';

export default function ReceitaScreen({ navigation, route }) {
  const receita = route.params.item;

  return (
    <ScrollView>
      <Card style={{ margin: 10 }}>
        <Card.Cover source={{ uri: receita.imagem }} />
        <Card.Content>
          <Text style={styles.titulo}>Nome: {receita.nome}</Text>
          <Text>Tempo de Preparo: {receita.tempoPreparo}</Text>
          <Text>Porções: {receita.porcoes}</Text>

          <Text style={styles.subtitulo}>Ingredientes:</Text>
          <Text>• {receita.ingredientes[0]}</Text>
          <Text>• {receita.ingredientes[1]}</Text>
          <Text>• {receita.ingredientes[2]}</Text>
          <Text>• {receita.ingredientes[3]}</Text>
          <Text>• {receita.ingredientes[4]}</Text>
          <Text>• {receita.ingredientes[5]}</Text>
          <Text>• {receita.ingredientes[6]}</Text>

          <Text style={styles.subtitulo}>Modo de Preparo:</Text>
          <Text>{receita.modoPreparo[0]}</Text>
          <Text>{receita.modoPreparo[1]}</Text>
          <Text>{receita.modoPreparo[2]}</Text>
          <Text>{receita.modoPreparo[3]}</Text>
          <Text>{receita.modoPreparo[4]}</Text>
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            icon="arrow-left"
            onPress={() => navigation.goBack()}
          >
            Voltar
          </Button>
        </Card.Actions>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    marginTop: 10,
    fontWeight: 'bold',
  },
});
