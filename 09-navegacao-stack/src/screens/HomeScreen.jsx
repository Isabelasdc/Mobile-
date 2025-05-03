import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

export default function HomeScreen(props) {

  const  {navigation, route } = props

  console.log("NAVIGATION => ", navigation)
  console.log("ROUTE => ", route)

  return (
    <View>
      <Text>HomeScreen</Text>

      <Button mode='contained' onPress={() => navigation.navigate('ProfileScreen')}>Ir para Tela Profile</Button>
    </View>
  )
}

const styles = StyleSheet.create({})