import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Text, Card, Title, Paragraph } from 'react-native-paper'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant='headlineLarge' style={{ textAlign: 'center'}}>Tela de Início</Text>
      <Card style={{width: '90%'}}>
        <Card.Content>
        <Title>Um título</Title>
        <Paragraph>Lá lá lá Lorem ipsum Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Card>

      <Card style={{width: '90%', margin: 20}}>
        <Card.Content>
        <Title>Um título</Title>
        <Paragraph>Lá lá lá Lorem ipsum Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Card>

      <Card style={{width: '90%'}}>
        <Card.Content>
        <Title>Um título</Title>
        <Paragraph>Lá lá lá Lorem ipsum Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        Lá lá lá Lorem ipsumLá lá lá Lorem ipsumLá lá lá Lorem ipsum
        </Paragraph>
        </Card.Content>
        <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
      </Card>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    flex: 1,
    alignItems: 'center',
    padding: 10
  }
})