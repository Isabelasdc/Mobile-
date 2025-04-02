import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PaperProvider, Card, Title, Paragraph, Divider, Button} from 'react-native-paper';

export default function App() {

      const lista = ["uva", "maça", "banana", "laranja"]
  
  return (
    <PaperProvider>
    <View style={styles.container}>
      <StatusBar style="auto" />


      <FlatList
        data={lista}
        renderItem={({item}) => <Text>{item}</Text>}
      />

      <FlatList
        data={lista}
        renderItem={({item}) => (
          <View>
            <Text>{item}</Text>
            <Divider />
          </View>
        )}
      />
      


    </View>
    </PaperProvider>
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
