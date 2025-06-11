// src/screens/HistoryScreen.jsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { getMoodRecords } from '../utils/storage';

// Mapeamento de emoji por nível de humor
const moodEmojiMap = {
  1: '😢',
  2: '😕',
  3: '😊',
  4: '😄',
};

export default function HistoryScreen({ navigation }) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecords = async () => {
      const data = await getMoodRecords();
      setRecords(data);
      setLoading(false);
    };

    fetchRecords();

    // Opcional: recarrega ao voltar pra tela
    const unsubscribe = navigation.addListener('focus', async () => {
      const data = await getMoodRecords();
      setRecords(data);
    });

    return unsubscribe;
  }, [navigation]);

  const renderRecordItem = ({ item }) => {
    const formattedDate = new Date(item.timestamp).toLocaleDateString('pt-BR', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return (
      <View style={styles.recordCard}>
        {/* Cabeçalho com data e nível de humor */}
        <View style={styles.headerRow}>
          <Text style={styles.date}>{formattedDate}</Text>
          <View style={styles.moodLevelContainer}>
            <Text style={styles.moodLevelLabel}>Nível:</Text>
            <Text style={styles.moodLevelEmoji}>
              {moodEmojiMap[item.moodLevel] || '😐'}
            </Text>
          </View>
        </View>

        {/* Conteúdo do registro */}
        <View style={styles.content}>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.description}>{item.description}</Text>

          <Text style={styles.label}>Humor Detectado:</Text>
          <Text style={styles.emotion}>
            {item.emotion ? item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1) : 'Não identificado'}
          </Text>

          {item.reflection && (
            <>
              <Text style={styles.label}>Reflexão:</Text>
              <Text style={styles.reflection}>{item.reflection}</Text>
            </>
          )}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text>Carregando histórico...</Text>
      </View>
    );
  }

  if (!records.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          Nenhum registro encontrado. Comece registrando seu humor!
        </Text>
      </View>
    );
  }

  return (
    <>
      <Header title="Histórico" />
      <View style={styles.container}>
        <FlatList
          data={records}
          keyExtractor={(item) => item.id}
          renderItem={renderRecordItem}
          contentContainerStyle={styles.listContent}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
  },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  moodLevelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moodLevelLabel: {
    marginRight: 5,
    fontWeight: 'bold',
    color: '#333',
  },
  moodLevelEmoji: {
    fontSize: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
  },
  emotion: {
    color: '#6200ee',
    fontStyle: 'italic',
    marginBottom: 10,
  },
  reflection: {
    color: '#2e7d32',
    fontStyle: 'italic',
    marginBottom: 10,
  },
});