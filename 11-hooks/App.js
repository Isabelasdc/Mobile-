import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Pessoa from './components/Pessoa';
import GerarNumeroAleatorio from './components/GerarNumeroAleatorio';
//import NomeNumero from './components/NomeNumero';
//import Controle from './components/Controle'
//import NumeroAleatorio from './components/NumeroAleatorio';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
    <Pessoa />
    <GerarNumeroAleatorio />
    {/*<NomeNumero />
    <Controle />
    <NumeroAleatorio /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
