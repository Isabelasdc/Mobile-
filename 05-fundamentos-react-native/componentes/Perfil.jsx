import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Perfil(props) {

    console.log(props)


  return (
    <View style={styles.container}>
      <Text style= {{fontSize: 20}}>Perfil</Text>
      <Text style= {{fontSize: 20}}>Nome : {props.nome}</Text>
      <Text style= {{fontSize: 20}}>Perfil: {props.idade}</Text>
      <Text style= {{fontSize: 20}}>Email: {props.email}</Text>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink'
    }
})