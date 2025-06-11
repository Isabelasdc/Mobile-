// src/screens/AnalysisScreen.jsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Header from '../components/Header'; // Verifique se o caminho está correto
import { getMoodRecords } from '../utils/storage'; // Verifique se o caminho está correto

// IMPORTAÇÃO ANTIGA - de volta ao react-native-chart-kit
import { PieChart } from 'react-native-chart-kit';

// Configuração necessária para o react-native-chart-kit
const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Cor padrão para textos, etc.
};

export default function AnalysisScreen() {
  const [moodData, setMoodData] = useState([]);

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        let records = await getMoodRecords();

        if (!records || records.length === 0) {
          records = [
            { emotion: 'Neutro' }, { emotion: 'Neutro' }, { emotion: 'Neutro' },
            { emotion: 'Motivado' }, { emotion: 'Motivado' },
            { emotion: 'Cansado' }, { emotion: 'Cansado' }, { emotion: 'Cansado' },
            { emotion: 'Feliz' }
          ];
        }

        const moodToEmoji = {
          Feliz: '😄',
          Triste: '😢',
          Cansado: '😴',
          Motivado: '💪',
          Neutro: '😐',
          Ansioso: '😟',
          Relaxado: '😌',
        };

        const moodCounts = {};
        records.forEach(record => {
          if (record.emotion) {
            const mood = record.emotion.charAt(0).toUpperCase() + record.emotion.slice(1);
            moodCounts[mood] = (moodCounts[mood] || 0) + 1;
          }
        });

        const colorPalette = ['#FFC107', '#6200ee', '#dc3545', '#17a2b8', '#28a745', '#343a40'];

        // ALTERADO: Formato dos dados de volta para o padrão do react-native-chart-kit
        const pieData = Object.entries(moodCounts).map(([mood, count], index) => ({
          name: `${moodToEmoji[mood] || '📊'} ${mood}`, // O texto da legenda com emoji
          population: count, // O valor da fatia
          color: colorPalette[index % colorPalette.length], // A cor da fatia e do ponto na legenda
          legendFontColor: '#333',
          legendFontSize: 15,
        }));

        setMoodData(pieData);
      } catch (error) {
        console.error('Erro ao carregar dados do histórico:', error);
      }
    };

    fetchMoodData();
  }, []);

  return (
    <>
      <Header title="Análise de Humor" />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.title}>📊 Resumo de Humor</Text>

          {moodData.length > 0 ? (
            // GRÁFICO ANTIGO: de volta ao PieChart do react-native-chart-kit
            <PieChart
              data={moodData}
              width={Dimensions.get('window').width - 16}
              height={220}
              chartConfig={chartConfig}
              accessor={"population"}
              backgroundColor={"transparent"}
              paddingLeft={"15"}
              absolute // Mostra os valores numéricos nas fatias
            />
          ) : (
            <Text style={styles.noDataText}>Não há dados para exibir. Comece a registrar seu humor!</Text>
          )}
        </View>
      </ScrollView>
    </>
  );
}

// ESTILOS: Removidos os estilos da legenda manual
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noDataText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});