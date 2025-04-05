import { StyleSheet, View } from 'react-native'
import { Avatar, Card, Text } from 'react-native-paper';

export default function Municipio(props) {
  const { nome, numero, imagem } = props;

  return (
    <Card style={styles.card}>
      <Card.Content style={styles.content}>
        <Avatar.Image 
          source={{ uri: imagem }} 
          size={48}
          style={styles.avatar}
        />
        <View style={styles.textContainer}>
          <Text variant="titleMedium" style={styles.title}>
            {nome}
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            {numero}
          </Text>
        </View>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 8,
    borderRadius: 12,
    elevation: 2,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  textContainer: {
    marginLeft: 16,
  },
  title: {
    fontWeight: '600',
    color: '#2c3e50',
  },
  subtitle: {
    color: '#7f8c8d',
    marginTop: 4,
  },
  avatar: {
    backgroundColor: '#ecf0f1',
  }
})