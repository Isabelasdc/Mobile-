import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Button, Card } from "react-native-paper";

export default function ListaScreen({ navigation, route }) {
  const carros = [
    { nome: "Gol", ano: "2012", cor: "Azul", fabricante: "Wolswagen" },
    { nome: "Civic", ano: "2010", cor: "Prata", fabricante: "Honda" },
    { nome: "Uno", ano: "2007", cor: "Verde", fabricante: "Fiat" },
  ];

  return (
    <View>
        <FlatList 
        data={carros}
        renderItem={({ item }) => (
        <Card style={{ margin : 10}} >
        <Card.Content>
            <Text>Carro: {item.nome}</Text>
        </Card.Content>
        <Card.Actions>
            <Button
            mode= 'contained'
            icon='arrow-right'
            onPress={() => navigation.navigate('ItemScreen', { item })}
            >
            Ver detalhes
            </Button>
        </Card.Actions>
        </Card>   
        )}
        
        
        
        />
    </View>
  );
}

const styles = StyleSheet.create({});
