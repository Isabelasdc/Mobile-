// src/screens/SuggestionsScreen.jsx
import React, { useState, useEffect } from 'react';
import { Linking } from 'react-native';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Header from '../components/Header';
import { getSuggestionByEmotion } from '../services/boredApi';
import { translateToPortuguese } from '../services/aiService';
import { getMoodRecords } from '../utils/storage';
import {
  mapTypeToPortuguese,
  getAccessibilityText,
  getDurationText,
  getPriceText
} from '../utils/translator';

export default function SuggestionsScreen() {
  const [suggestions, setSuggestions] = useState([]);
  const [dominantEmotion, setDominantEmotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const records = await getMoodRecords();

        if (!records.length) {
          setDominantEmotion('Nenhum registro encontrado');
          return;
        }

        const lastRecord = records[records.length - 1];
        const currentEmotion = lastRecord.emotion || 'neutro';
        setDominantEmotion(currentEmotion);

        const suggestion = await getSuggestionByEmotion(currentEmotion);
        // Traduz todos os campos necessários
        const [translatedActivity, translatedAccessibility] = await Promise.all([
          translateToPortuguese(suggestion.activity),
          translateToPortuguese(suggestion.accessibility),
        ]);

        setSuggestions([{
          ...suggestion,
          translatedActivity,
          translatedAccessibility,
        }]);
        setError(false);
      } catch (err) {
        console.error('❌ Erro ao buscar sugestões:', err.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, []);

  const renderSuggestionItem = ({ item }) => (
    <View style={styles.suggestionCard}>
      <Text style={styles.label}>Atividade:</Text>
      <Text style={styles.activity}>{item.translatedActivity || item.activity}</Text>

      <Text style={styles.label}>Tipo:</Text>
      <Text style={styles.detail}>{mapTypeToPortuguese(item.type)}</Text>

      <Text style={styles.label}>Participantes:</Text>
      <Text style={styles.detail}>{item.participants} pessoa(s)</Text>

      <Text style={styles.label}>Acessibilidade:</Text>
      <Text style={styles.detail}>{item.translatedAccessibility || item.accessibility}</Text>

      <Text style={styles.label}>Duração:</Text>
      <Text style={styles.detail}>{getDurationText(item.duration)}</Text>

      {item.link && (
        <Text style={styles.link} onPress={() => Linking.openURL(item.link)}>
          🔗 Saiba mais
        </Text>
      )}
    </View>
  );

  const mapTypeToPortuguese = (type) => {
    const typeMap = {
      recreational: 'Recreação',
      educational: 'Educação',
      social: 'Social',
      diy: 'Faça você mesmo',
      cooking: 'Cozinha',
      relaxation: 'Relaxamento',
      music: 'Música',
      charity: 'Voluntariado',
    };
    return typeMap[type] || type;
  };

  const getAccessibilityText = (value) => {
    if (value <= 0.2) return 'Muito acessível';
    if (value <= 0.5) return 'Acessível';
    if (value <= 0.7) return 'Moderado';
    return 'Baixa acessibilidade';
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Carregando sugestões...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>
          Erro ao carregar sugestões. Tente novamente mais tarde.
        </Text>
      </View>
    );
  }

  return (
    <>
      <Header title="Sugestões" />
      <View style={styles.container}>
        {dominantEmotion === 'Nenhum registro encontrado' ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Nenhum registro encontrado. Registre seu humor primeiro para receber sugestões personalizadas!
            </Text>
          </View>
        ) : (
          <>
            <Text style={styles.subtitle}>
              Com base no seu último registro ({dominantEmotion}):
            </Text>
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderSuggestionItem}
              ListEmptyComponent={
                <Text style={styles.emptyText}>Nenhuma sugestão disponível.</Text>
              }
            />
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#6200ee',
  },
  errorText: {
    textAlign: 'center',
    color: 'red',
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    fontSize: 16,
  },
  suggestionCard: {
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
  label: {
    fontWeight: 'bold',
    marginTop: 5,
    color: '#333',
  },
  activity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  detail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  link: {
    marginTop: 10,
    color: '#007aff',
    fontWeight: 'bold',
  },
});