import { StyleSheet, Text, View, Button} from 'react-native'
import React from 'react'

export default function JavascriptComponente() {


    const nome = "Isabela"
    const idade = 24



    function checarMaiorIdade(){
        if(idade >= 18){
            return "Maior de Idade"
        } else {
            return "Menor de Idade"
        }

    }

    function alerta (){
        alert("Clicou no botão!!!!")
    }


  return (
    <View style={styles.container}>
      <Text>JavascriptComponente</Text>
      <Text>Nome: {nome}</Text>
      <Text>Idade: {idade}</Text>
      <Text>Idade+40: {idade + 40}</Text>
      <Text>18+: {checarMaiorIdade()}</Text>
      <Button title='clicar' onPress={alerta}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'pink'

    },
})