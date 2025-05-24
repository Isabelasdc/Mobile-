import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Card, IconButton, Text, ActivityIndicator, MD2Colors } from 'react-native-paper';

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://dummyjson.com/products/category-list")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar categorias:", error);
        setLoading(false);
      });
  }, []);

  const renderCategoryItem = ({ item }) => (
    <Card
      style={styles.card}
      onPress={() => navigation.navigate('ListaProdutosScreen', { category: item })}
    >
      <Card.Content style={styles.cardContent}>
        <Text variant="titleMedium" style={styles.categoryText}>
          {item.charAt(0).toUpperCase() + item.slice(1).replace('-', ' ')}
        </Text>
        <IconButton icon="chevron-right" size={24} />
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} color={MD2Colors.blue800} size="large" />
        <Text variant="titleLarge" style={styles.loadingText}>Carregando categorias...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 8,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 8,
  },
  categoryText: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
  },
});