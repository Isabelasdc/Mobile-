import {  View } from 'react-native'
import React, { useState } from 'react'
import { Button, Card, Text } from 'react-native-paper'

export default function Controle() {


    const [volume, setVolume] = useState(0)

    function aumentar (){
        setVolume(volume + 1)
    }

    function diminuir (){
        setVolume(volume - 1)
        
    }


  return (
    <View>
      <Card>
        <Card.Content>
            <Card.Title title="Componente Controle"></Card.Title>
            <Text variant='displayMedium'>Volume: {volume}</Text>
        </Card.Content>
        <Card.Actions>
        <Button
            mode='contained-tonal'
            icon='minus'
            onPress={diminuir} 
            >
             mostrar
            </Button>
            <Button
            mode='contained-tonal'
            icon='plus'
            onPress={aumentar}
            >
             mostrar
            </Button>
        </Card.Actions>
      </Card>
    </View>
  )
}

