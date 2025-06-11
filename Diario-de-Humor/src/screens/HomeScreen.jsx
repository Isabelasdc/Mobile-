// src/screens/HomeScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import Header from '../components/Header';

const moods = [
  { id: 1, emoji: '😄', label: 'Ótimo' },
  { id: 2, emoji: '🙂', label: 'Bem' },
  { id: 3, emoji: '😐', label: 'Normal' },
  { id: 4, emoji: '😟', label: 'Ruim' },
  { id: 5, emoji: '😭', label: 'Péssimo' },
];

export default function HomeScreen({ navigation }) {
  const [selectedMood, setSelectedMood] = useState(null);

  // Animação dos botões de humor
  const scaleValues = moods.reduce((acc, mood) => {
    acc[mood.id] = new Animated.Value(1);
    return acc;
  }, {});

  const handleMoodSelection = (id) => {
    setSelectedMood(id);

    // Animação suave no clique
    Animated.sequence([
      Animated.timing(scaleValues[id], {
        toValue: 1.2,
        duration: 100,
        useNativeDriver: false,
      }),
      Animated.timing(scaleValues[id], {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.navigate('Registrar Humor');
      }, 100); // Atraso pra evitar conflito
    });
  };

  // Simulação de histórico semanal
  const weeklyMood = [
    { day: 'SEG', emoji: '🙂' },
    { day: 'TER', emoji: '😄' },
    { day: 'QUA', emoji: '' }, // Sem registro
    { day: 'QUI', emoji: '🙂' },
    { day: 'SEX', emoji: '😟' },
    { day: 'SAB', emoji: '😄' },
    { day: 'DOM', emoji: '' },
  ];

  return (
    <>
      <Header title="Diário de Humor" />
      <View style={styles.container}>
        {/* Saudação e avatar */}
        <View style={styles.topBar}>
          <Text style={styles.greeting}>Bom dia, Bruno! 👋</Text>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>👤</Text>
          </View>
        </View>

        {/* Pergunta + Emojis */}
        <View style={styles.moodQuestion}>
          <Text style={styles.question}>Como você está se sentindo agora?</Text>
          <View style={styles.moodRow}>
            {moods.map((mood) => {
              const animatedStyle = {
                transform: [{ scale: scaleValues[mood.id] }],
              };

              return (
                <Animated.View key={mood.id} style={[animatedStyle]}>
                  <TouchableOpacity
                    onPress={() => handleMoodSelection(mood.id)}
                    style={[
                      styles.moodButton,
                      selectedMood === mood.id && styles.selectedMoodButton,
                    ]}
                  >
                    <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                    <Text style={styles.moodLabel}>{mood.label}</Text>
                  </TouchableOpacity>
                </Animated.View>
              );
            })}
          </View>
        </View>

        {/* Resumo da Semana */}
        <View style={styles.weekSummary}>
          <Text style={styles.sectionTitle}>Seu Resumo da Semana</Text>
          <View style={styles.weekDays}>
            {weeklyMood.map((day, idx) => (
              <View key={idx} style={styles.dayItem}>
                <Text>{day.day}</Text>
                <Text style={styles.dayEmoji}>{day.emoji || '–'}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Cards de Ação */}
        <View style={styles.actionCards}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Sugestões')}
          >
            <Text style={styles.cardTitle}>📝 Sugestões Personalizadas</Text>
            <Text style={styles.cardDescription}>
              Veja sugestões baseadas no seu último registro.
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Histórico')}
          >
            <Text style={styles.cardTitle}>📖 Ver Histórico</Text>
            <Text style={styles.cardDescription}>
              Confira todos os registros que você já fez.
            </Text>
          </TouchableOpacity>
        </View>

        {/* Dica do Dia */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>✨ Dica do Dia</Text>
          <Text style={styles.tipText}>
            "Pequenas pausas durante o dia podem melhorar muito seu foco e bem-estar."
          </Text>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 24,
  },
  moodQuestion: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  moodButton: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
  },
  selectedMoodButton: {
    backgroundColor: '#e0e0e0',
  },
  moodEmoji: {
    fontSize: 28,
  },
  moodLabel: {
    marginTop: 5,
    fontSize: 12,
    color: '#555',
  },
  weekSummary: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  dayItem: {
    alignItems: 'center',
  },
  dayEmoji: {
    fontSize: 24,
    marginVertical: 5,
  },
  actionCards: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
  },
  tipCard: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  tipText: {
    fontStyle: 'italic',
    color: '#333',
  },
});