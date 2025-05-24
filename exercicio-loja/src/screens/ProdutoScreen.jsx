import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, ActivityIndicator, MD2Colors, Button } from 'react-native-paper';

export default function ProdutoScreen({ route, navigation }) {
  const { id } = route.params;
  const [produto, setProduto] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => {
        setProduto(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erro ao buscar produto:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.blue800} size="large" />
        <Text variant="titleLarge" style={styles.loadingText}>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!produto) {
    return (
      <View style={styles.loadingContainer}>
        <Text variant="titleLarge">Produto não encontrado</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card>
        <Card.Cover source={{ uri: produto.thumbnail }} />
        <Card.Content>
          <Text variant="titleLarge" style={styles.title}>{produto.title}</Text>
          <Text variant="bodyMedium" style={styles.price}>💲 {produto.price}</Text>
          <Text variant="bodySmall" style={styles.rating}>⭐ {produto.rating}</Text>
          <Text variant="bodyMedium" style={styles.description}>{produto.description}</Text>
          <Text variant="bodySmall" style={styles.category}>Categoria: {produto.category}</Text>
          <Text variant="bodySmall" style={styles.brand}>Marca: {produto.brand}</Text>
          <Text variant="bodySmall" style={styles.stock}>Estoque: {produto.stock}</Text>
        </Card.Content>
      </Card>

      <Text variant="titleMedium" style={styles.galleryTitle}>Galeria</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
        {produto.images.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={styles.galleryImage}
            resizeMode="cover"
          />
        ))}
      </ScrollView>

      <Button 
        mode="contained" 
        onPress={() => navigation.goBack()} 
        style={styles.backButton}
      >
        Voltar
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
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
  title: {
    marginTop: 8,
    fontWeight: 'bold',
  },
  price: {
    marginVertical: 4,
    color: '#007B00',
  },
  rating: {
    marginBottom: 4,
  },
  description: {
    marginVertical: 8,
    textAlign: 'justify',
  },
  category: {
    marginTop: 4,
    color: '#555',
  },
  brand: {
    color: '#555',
  },
  stock: {
    marginBottom: 8,
    color: '#555',
  },
  galleryTitle: {
    marginTop: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  gallery: {
    flexDirection: 'row',
  },
  galleryImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 8,
  },
  backButton: {
    marginTop: 20,
  },
});
