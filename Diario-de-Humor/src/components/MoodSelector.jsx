// src/components/MoodSelector.jsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const moodOptions = [
  { id: 1, emoji: '😢', label: 'Triste' },
  { id: 2, emoji: '😕', label: 'Neutro' },
  { id: 3, emoji: '😊', label: 'Feliz' },
  { id: 4, emoji: '😄', label: 'Muito Feliz' },
];

export default function MoodSelector({ onSelect }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (id) => {
    const newSelected = selected === id ? null : id;
    setSelected(newSelected);
    onSelect(newSelected);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Selecione seu humor:</Text>
      <View style={styles.optionsContainer}>
        {moodOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.option,
              selected === option.id && styles.selectedOption,
            ]}
            onPress={() => handleSelect(option.id)}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  option: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    width: 80,
  },
  selectedOption: {
    backgroundColor: '#cbbdf7',
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  emoji: {
    fontSize: 24,
    marginBottom: 5,
  },
});