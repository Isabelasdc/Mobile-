import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { PaperProvider, Card, Title, Paragraph, Divider, Button} from 'react-native-paper';

export default function App() {

      const lista = [
        {
        titulo: "Card 1",
        descricao: "Alguma coisa coisa",
        imagem: "https://i.pinimg.com/564x/32/b6/16/32b6163218ac52ce74356102576481e3.jpg"
        },
        {
          titulo: "Card 1",
          descricao: "Alguma coisa coisa",
          imagem: "https://i.pinimg.com/564x/32/b6/16/32b6163218ac52ce74356102576481e3.jpg"
          },
          {
            titulo: "Card 1",
            descricao: "Alguma coisa coisa",
            imagem: "https://i.pinimg.com/564x/32/b6/16/32b6163218ac52ce74356102576481e3.jpg"
          }
          ,
          {
            titulo: "Card 1",
            descricao: "Alguma coisa coisa",
            imagem: "https://i.pinimg.com/564x/32/b6/16/32b6163218ac52ce74356102576481e3.jpg"
          }
      ]
  
  return (
    <PaperProvider>
    <View style={styles.container}>
      <StatusBar style="auto" />


      <FlatList
        horizontal
        data={lista}
        renderItem={({item}) => (
          <Card>
            <Card.Content>
            <Title>{item.titulo}</Title>
            <Paragraph>{item.descricao}</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: item.imagem}}/>
          </Card>
        )}
      />

      <FlatList
        data={lista}
        renderItem={({item}) => (
          <Card>
            <Card.Content>
            <Title>{item.titulo}</Title>
            <Paragraph>{item.descricao}</Paragraph>
            </Card.Content>
            <Card.Cover source={{uri: item.imagem}}/>
          </Card>
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
