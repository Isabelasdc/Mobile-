import { View } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Text, } from 'react-native-paper'

export default function NomeNumero() {

    const [nome, setNome] = useState('????')

 
    let numero = '????'

    function mostrarNomeNumero(){
        setNome ("Lucas")
        numero = "1234"
    }

    function alterarNome(){
        setNome("Pedro")
      }

  return (
    <View>

    <Card>
        <Card.Content>
        <Card.Title title="Componente NomeNumero"/>
        <Text variant='displayMedium'>Nome: {nome}</Text>
        <Text variant='displayMedium'>Número: {numero}</Text>
        </Card.Content>
        <Card.Actions>
            <Button onPress={mostrarNomeNumero}>Mostrar</Button>
            <Button onPress={alterarNome}>Alterar Nome</Button>
        </Card.Actions>
    </Card>

    </View>
  )
}

