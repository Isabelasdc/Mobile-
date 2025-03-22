import { Button, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function JavascriptComponente() {

    const nome = "Isabela"
    const idade = 15

    function checkMaiorIdade() {
        if(idade >= 18){
            return "Maior de Idade"
        } else {
            return "Menor de Idade"
        }
    }

    function alerta (){
        alert("Clicou no botão !!!")
    }

  return (
    <View>
      <Text>JavascriptComponente</Text>
      <Text>Nome:{nome}</Text>
      <Text>Idade:{idade}</Text>
      <Text> Idade+40 {idade + 40 }</Text>
      <Text>É maior de idade? {checkMaiorIdade()}</Text>
      <Text>Check 18+: {idade >= 18 ? "18+" : "18-"}</Text>
      <Button title='Clicar' onPress={alerta}></Button>
    </View>
  )
}

const styles = StyleSheet.create({})