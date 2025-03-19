import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image} from 'react-native';


//Função que define o componente
//Retornar o que vai ser renderizado na tela(Template feito com JSX)


export default function App() {
  //lógica do meu componente
  const nome = "Isabela"

  function alerta (){
    alert("Clicou no botão")
  }


  //Retorno com o jsx
  return ( 
    <View style={styles.container}>
      <StatusBar style='auto'/>

      <Image
        source={{
          uri: "https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2024/07/hello-kitt-perfil.jpg?w=1054"
        }}
        style={{
          height:400,
          width:450
        }}
        
      
      />

      <Text>Bem vindo {nome} </Text>

      <Text>{2 + 2}</Text>
      <Button title='Clicar'> onPress={alerta}</Button>
    </View>
  );
}


//estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
