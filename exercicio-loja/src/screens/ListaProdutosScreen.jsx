import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Avatar, Card, Text, Divider, ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function ListaProdutosScreen({ navigation, route }) {
  const { category } = route.params;
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/category/${category}`)
      .then(resposta => {
        setProdutos(resposta.data.products);
        setLoading(false);
      })
      .catch(erro => {
        console.error('Erro ao buscar produtos:', erro);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.blue800} size="large" />
        <Text variant="titleLarge" style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.categoryTitle}>
        {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
      </Text>
      
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card 
            style={styles.card}
            onPress={() => navigation.navigate('ProdutoScreen', { id: item.id })}

          >
            <Card.Content style={styles.cardContent}>
              <Avatar.Image 
                source={{ uri: item.thumbnail }} 
                size={60}
                style={styles.productImage}
              />
              <View style={styles.productInfo}>
                <Text variant="titleMedium">{item.title}</Text>
                <Text variant="bodyMedium">${item.price}</Text>
                <Text variant="bodySmall" numberOfLines={1}>{item.description}</Text>
              </View>
              <Text>⭐ {item.rating}</Text>
            </Card.Content>
          </Card>
        )}
        ItemSeparatorComponent={() => <Divider style={styles.divider} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
  categoryTitle: {
    textAlign: 'center',
    marginVertical: 16,
    fontWeight: 'bold',
  },
  card: {
    marginVertical: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productImage: {
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    marginRight: 8,
  },
  divider: {
    marginVertical: 8,
  },
});