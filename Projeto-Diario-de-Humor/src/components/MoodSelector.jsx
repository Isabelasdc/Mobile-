// src/components/MoodSelector.jsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const moodOptions = [
  { level: 1, emoji: '😢', label: 'Triste' },
  { level: 2, emoji: '😕', label: 'Neutro' },
  { level: 3, emoji: '😊', label: 'Feliz' },
  { level: 4, emoji: '😄', label: 'Radiante' },
];

// O componente agora recebe 'selected' como prop e não tem mais estado interno
export default function MoodSelector({ onSelect, selected }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Como você está se sentindo?</Text>
      <View style={styles.optionsContainer}>
        {moodOptions.map((option) => (
          <TouchableOpacity
            key={option.level}
            // A lógica de estilo agora usa a prop 'selected' vinda do pai
            style={[
              styles.option,
              selected === option.level && styles.selectedOption,
            ]}
            // A chamada de seleção ficou mais simples
            onPress={() => onSelect(option.level)}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text style={styles.label}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  option: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#ddd',
    minWidth: 70,
  },
  selectedOption: {
    backgroundColor: '#eadaff',
    borderColor: '#6200ee',
  },
  emoji: {
    fontSize: 28,
  },
  label: {
    fontSize: 12,
    marginTop: 5,
  },
});