// src/screens/HomeScreen.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getMoodRecords } from '../utils/storage';
import { getUser } from '../utils/auth';
import { generateDailyTipWithGemini } from '../services/aiService';

const moodConfig = {
  1: { emoji: '😢', label: 'Triste' },
  2: { emoji: '😕', label: 'Neutro' },
  3: { emoji: '😊', label: 'Feliz' },
  4: { emoji: '😄', label: 'Radiante' },
  5: { emoji: '🤩', label: 'Empolgado' },
  6: { emoji: '😴', label: 'Cansado' },
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('Usuário');
  const [loading, setLoading] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState({});
  const [dailyTip, setDailyTip] = useState('');

  const calculateWeeklySummary = (records) => {
    const today = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const weekRecords = records.filter(r => new Date(r.timestamp) >= sevenDaysAgo);
    const summary = weekRecords.reduce((acc, record) => {
      if (record.moodLevel) {
        acc[record.moodLevel] = (acc[record.moodLevel] || 0) + 1;
      }
      return acc;
    }, {});
    return summary;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [records, profile, tip] = await Promise.all([
          getMoodRecords(),
          getUser(),
          generateDailyTipWithGemini()
        ]);
        
        if (profile && profile.name) {
          setUserName(profile.name);
        }
        const summary = calculateWeeklySummary(records);
        setWeeklySummary(summary);
        setDailyTip(tip);
      } catch (error) {
        console.error("Erro ao carregar dados da HomeScreen:", error);
        setDailyTip("Lembre-se de ser gentil com você mesmo hoje.");
      } finally {
        setLoading(false);
      }
    };
    const unsubscribe = navigation.addListener('focus', fetchData);
    return unsubscribe;
  }, [navigation]);

  const handleNavigate = useCallback((screen) => {
    navigation.navigate(screen);
  }, [navigation]);

  const renderSummaryItem = ([moodLevel, count]) => {
    const mood = moodConfig[moodLevel];
    if (!mood) return null;
    return (
      <View key={moodLevel} style={styles.summaryItem}>
        <Text style={styles.summaryEmoji}>{mood.emoji}</Text>
        <Text style={styles.summaryCount}>x{count}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.titleContainer}>
        <Text style={styles.mainTitle}>Diário de Humor</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.greeting}>Olá, {userName}!</Text>
        <Text style={styles.subtitle}>Como você está se sentindo agora?</Text>

        <View style={styles.card}>
          <View style={styles.quickMoodContainer}>
            {Object.entries(moodConfig).map(([level, { emoji }]) => (
              // MUDANÇA AQUI: Usando o nome correto da tela "Registrar Humor"
              <TouchableOpacity key={level} onPress={() => handleNavigate('Registrar Humor')}>
                <Text style={styles.quickMoodEmoji}>{emoji}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Resumo da Semana</Text>
          {loading ? <ActivityIndicator color="#6200ee" /> : (
            Object.keys(weeklySummary).length > 0 ? (
              <View style={styles.summaryContainer}>
                {Object.entries(weeklySummary).map(renderSummaryItem)}
              </View>
            ) : <Text style={styles.cardText}>Nenhum registro encontrado na última semana.</Text>
          )}
        </View>
        
        <View style={styles.card}>
          <Text style={styles.cardTitle}>💡 Dica do Dia</Text>
          {loading ? <ActivityIndicator color="#6200ee" /> : <Text style={styles.cardText}>{dailyTip}</Text>}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigate('Histórico')}>
            <Text style={styles.actionText}>Ver Histórico Completo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={() => handleNavigate('Sugestões')}>
            <Text style={styles.actionText}>Sugestões  de atividade para Você</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
    titleContainer: { backgroundColor: '#6200ee', paddingVertical: 16, paddingHorizontal: 20, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    mainTitle: { fontSize: 22, fontWeight: 'bold', color: '#fff', textAlign: 'center' },
    contentContainer: { padding: 20, paddingBottom: 40 },
    greeting: { fontSize: 26, fontWeight: 'bold', color: '#333' },
    subtitle: { fontSize: 18, color: '#666', marginBottom: 20 },
    card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } },
    cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#333' },
    cardText: { fontSize: 16, lineHeight: 24, color: '#555' },
    quickMoodContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' },
    quickMoodEmoji: { fontSize: 32 },
    summaryContainer: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
    summaryItem: { alignItems: 'center', marginHorizontal: 12, marginVertical: 5 },
    summaryEmoji: { fontSize: 30 },
    summaryCount: { fontSize: 14, fontWeight: 'bold', color: '#6200ee' },
    actionsContainer: { marginTop: 10 },
    actionButton: { backgroundColor: '#fff', padding: 18, borderRadius: 12, marginBottom: 10, elevation: 2, alignItems: 'center' },
    actionText: { fontSize: 16, fontWeight: 'bold', color: '#6200ee' },
});