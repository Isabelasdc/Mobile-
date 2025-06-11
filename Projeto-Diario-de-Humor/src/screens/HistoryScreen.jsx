// src/screens/HistoryScreen.jsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  Alert,
} from 'react-native';
import Header from '../components/Header';
// 1. MUDANÇA AQUI: Importando a função correta para deletar
import { getMoodRecords, deleteMoodRecord } from '../utils/storage';

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
    // Recarrega os dados sempre que a tela recebe foco
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      const data = await getMoodRecords();
      setRecords(data || []);
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

  // 2. MUDANÇA AQUI: A função handleDelete agora usa deleteMoodRecord
  const handleDelete = (recordId) => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este registro?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: async () => {
            // Primeiro, chama a função para deletar do armazenamento
            await deleteMoodRecord(recordId);
            
            // Depois, atualiza a lista na tela para refletir a mudança
            const updatedRecords = records.filter((record) => record.id !== recordId);
            setRecords(updatedRecords);
          },
          style: 'destructive',
        },
      ]
    );
  };

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
        <View style={styles.headerRow}>
          <Text style={styles.date}>{formattedDate}</Text>
          <View style={styles.moodLevelContainer}>
            <Text style={styles.moodLevelLabel}>Humor:</Text>
            <Text style={styles.moodLevelEmoji}>
              {moodEmojiMap[item.moodLevel] || '😐'}
            </Text>
          </View>
        </View>
        <View style={styles.content}>
          <Text style={styles.label}>Humor Detectado:</Text>
          <Text style={styles.emotion}>
            {item.emotion ? item.emotion.charAt(0).toUpperCase() + item.emotion.slice(1) : 'N/A'}
          </Text>
          <Text style={styles.label}>Descrição:</Text>
          <Text style={styles.description}>{item.description}</Text>
          {item.reflection && (
            <>
              <Text style={styles.label}>Reflexão da IA:</Text>
              <Text style={styles.reflection}>{item.reflection}</Text>
            </>
          )}
        </View>
        <View style={styles.actionsContainer}>
          <Button
            title="Excluir"
            onPress={() => handleDelete(item.id)}
            color="#ef5350"
          />
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

  return (
    <>
      <Header title="Histórico" />
      <View style={styles.container}>
        {records.length > 0 ? (
          <FlatList
            data={records}
            keyExtractor={(item) => item.id}
            renderItem={renderRecordItem}
            contentContainerStyle={styles.listContent}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum registro encontrado.
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

// Seus estilos (com pequenas melhorias)
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  listContent: { paddingHorizontal: 15, paddingTop: 10, paddingBottom: 30 },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#777' },
  recordCard: { backgroundColor: '#fff', borderRadius: 10, padding: 15, marginBottom: 15, elevation: 2 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, alignItems: 'center' },
  date: { fontSize: 13, color: '#888', flex: 1 },
  moodLevelContainer: { flexDirection: 'row', alignItems: 'center' },
  moodLevelLabel: { marginRight: 5, fontWeight: 'bold', color: '#333' },
  moodLevelEmoji: { fontSize: 24 },
  content: { borderTopWidth: 1, borderTopColor: '#f0f0f0', paddingTop: 10 },
  label: { fontWeight: 'bold', marginTop: 8, color: '#333' },
  description: { fontSize: 15, color: '#555', marginBottom: 10 },
  emotion: { color: '#6200ee', fontStyle: 'italic', marginBottom: 10, fontSize: 15 },
  reflection: { color: '#2e7d32', fontStyle: 'italic', marginBottom: 10, fontSize: 15 },
  actionsContainer: { marginTop: 15, paddingTop: 10, borderTopWidth: 1, borderTopColor: '#f0f0f0', alignItems: 'flex-end' },
});