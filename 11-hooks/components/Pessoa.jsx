import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Text } from 'react-native-paper'


export default function Pessoa() {

    const [pessoa, setPessoa] = useState({})

    function revelar (){
        const novaPessoa = {
            nome: "Isabela",
            idade: "24",
            imagem: "https://i.pinimg.com/736x/b0/01/d3/b001d3d82be8b5f93730b9f4b2388182.jpg"
        }
        setPessoa(novaPessoa)
    }

    function revelar2 (){
        const novaPessoa = {
            nome: "Anya",
            idade: "13",
            imagem: "https://i.pinimg.com/736x/31/e1/21/31e1215624daee27ca2c03efb6e7c475.jpg"
        }
        setPessoa(novaPessoa)
    }


  return (
    <View>
      <Card>
        <Card.Content>
        <Text variant='displaySmall'>Componente Pessoa</Text>
        <Text variant='displaySmall'>Nome: {pessoa.nome}</Text>
        <Text variant='displaySmall'>Idade: {pessoa.idade}</Text>
        <Card.Cover source={{uri: pessoa.imagem}}/>
        </Card.Content>
        <Card.Actions>
        <Button onPress={revelar}>Revelar</Button>
        <Button onPress={revelar2}>Revelar</Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

