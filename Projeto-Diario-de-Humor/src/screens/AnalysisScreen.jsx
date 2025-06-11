// src/screens/AnalysisScreen.jsx

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native';
import Header from '../components/Header';
import { getMoodRecords } from '../utils/storage';
import { useNavigation } from '@react-navigation/native';
import { PieChart, LineChart } from 'react-native-gifted-charts';

// MUDANÇA AQUI: Criamos um mapa de cores fixo para cada humor
const moodColorMap = {
  Feliz: '#FFD700',      // Dourado
  Contente: '#4CAF50',    // Verde
  Motivado: '#2196F3',    // Azul
  Animado: '#FF9800',     // Laranja
  Relaxado: '#00BCD4',    // Ciano
  Ansioso: '#f44336',     // Vermelho
  Triste: '#3F51B5',      // Indigo
  Cansado: '#607D8B',     // Cinza Azulado
  Neutro: '#9E9E9E',      // Cinza
  Descansado: '#8BC34A',  // Verde Claro
};

export default function AnalysisScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [moodData, setMoodData] = useState([]);
  const [sleepData, setSleepData] = useState([]);
  const [insights, setInsights] = useState({ mostFrequentMood: 'N/A', averageSleep: 'N/A', totalRecords: 0 });

  const processDataForCharts = (records) => {
    const moodCounts = records.reduce((acc, record) => {
      if (record.emotion) {
        const mood = record.emotion.charAt(0).toUpperCase() + record.emotion.slice(1);
        acc[mood] = (acc[mood] || 0) + 1;
      }
      return acc;
    }, {});
    
    const totalMoodRecords = Object.values(moodCounts).reduce((sum, count) => sum + count, 0);

    const pieData = Object.entries(moodCounts).map(([mood, count]) => ({
      value: count,
      // MUDANÇA AQUI: A cor agora vem do mapa de cores, garantindo que seja sempre a mesma para cada humor
      color: moodColorMap[mood] || '#A9A9A9', // Usa uma cor padrão se o humor não estiver no mapa
      text: `${Math.round((count / totalMoodRecords) * 100)}%`,
      label: mood,
    }));
    setMoodData(pieData);

    const sleepRecords = records
      .filter(r => typeof r.sleepQuality === 'number' && r.timestamp)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
      .slice(-7);

    if (sleepRecords.length > 1) {
      setSleepData(sleepRecords.map(r => ({
        value: r.sleepQuality,
        label: new Date(r.timestamp).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      })));
    } else {
      setSleepData([]);
    }
    
    const mostFrequentMood = pieData.sort((a, b) => b.value - a.value)[0]?.label || 'N/A';
    const sleepQualityRecords = records.filter(r => typeof r.sleepQuality === 'number');
    let averageSleep = 'N/A';
    if(sleepQualityRecords.length > 0) {
      const totalSleep = sleepQualityRecords.reduce((sum, r) => sum + r.sleepQuality, 0);
      averageSleep = (totalSleep / sleepQualityRecords.length).toFixed(1);
    }
    setInsights({ mostFrequentMood, averageSleep, totalRecords: totalMoodRecords });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const records = await getMoodRecords();
        processDataForCharts(records);
      } catch (error) {
        console.error('Erro ao carregar dados de análise:', error);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, [navigation]);
  
  const renderPieLegend = (item) => (
    <View key={item.label} style={styles.legendItem}>
      <View style={[styles.legendColorBox, { backgroundColor: item.color }]} />
      <Text style={styles.legendText}>{item.label}: {item.text}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Análise de Humor" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.mainTitle}>Suas Tendências</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Insights Rápidos</Text>
          <Text style={styles.insightText}>- Humor mais frequente: <Text style={styles.insightHighlight}>{insights.mostFrequentMood}</Text></Text>
          <Text style={styles.insightText}>- Média de sono: <Text style={styles.insightHighlight}>{insights.averageSleep} / 5</Text></Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>📊 Distribuição de Humor</Text>
          {moodData.length > 0 ? (
            <View style={styles.chartContainer}>
              <PieChart
                data={moodData}
                donut
                showText
                textColor="white"
                fontWeight='bold'
                radius={90}
                textSize={14}
                focusOnPress
                toggleFocusOnPress={false}
                centerLabelComponent={() => (
                  <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{fontSize: 22, fontWeight: 'bold', color: '#333'}}>{insights.totalRecords}</Text>
                    <Text style={{fontSize: 14, color: '#555'}}>Registros</Text>
                  </View>
                )}
              />
              <View style={styles.legendContainer}>
                {moodData.map(renderPieLegend)}
              </View>
            </View>
          ) : (
            <Text style={styles.noDataText}>Sem dados de humor para exibir.</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🌙 Tendência de Sono</Text>
          {sleepData.length > 0 ? (
            <LineChart
              data={sleepData}
              color="#6200ee"
              thickness={3}
              dataPointsColor="#6200ee"
              dataPointsRadius={5}
              isAnimated
              curved
              yAxisTextStyle={{color: '#555'}}
              xAxisLabelTextStyle={{color: '#555'}}
              yAxisLabelSuffix=""
              noOfSections={5}
              maxValue={5}
              yAxisOffset={0}
            />
          ) : (
            <Text style={styles.noDataText}>Registre seu sono por alguns dias para ver a tendência.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f5f5f5' },
  scrollContainer: { paddingBottom: 30 },
  mainTitle: { fontSize: 24, fontWeight: 'bold', color: '#333', textAlign: 'center', margin: 20 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, marginHorizontal: 15, marginBottom: 20, elevation: 3, shadowColor: '#000', shadowOpacity: 0.08 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  noDataText: { fontSize: 16, color: '#666', textAlign: 'center', paddingVertical: 30 },
  insightText: { fontSize: 16, color: '#555', marginBottom: 10, lineHeight: 24 },
  insightHighlight: { fontWeight: 'bold', color: '#6200ee' },
  chartContainer: { alignItems: 'center', paddingVertical: 10 },
  legendContainer: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 25, paddingLeft: 10 },
  legendItem: { flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 10 },
  legendColorBox: { height: 12, width: 12, borderRadius: 6, marginRight: 10 },
  legendText: { fontSize: 14, color: '#333' }
});