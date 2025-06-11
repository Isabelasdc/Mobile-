// src/components/SonoSelector.jsx

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

// Renomeado para SonoSelector para consistência
export default function SonoSelector({ maxRating = 5, onRate, selectedRating }) {
  const ratings = Array.from({ length: maxRating }, (_, i) => i + 1);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Qualidade do Sono na Última Noite:</Text>
      <View style={styles.ratingsRow}>
        {ratings.map((rating) => (
          <TouchableOpacity
            key={rating}
            style={[
              styles.ratingButton,
              selectedRating === rating && styles.selected,
            ]}
            onPress={() => onRate(rating)}
          >
            <Text style={[styles.ratingText, selectedRating === rating && styles.selectedText]}>
              {rating}
            </Text>
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
  ratingsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 22.5,
    borderWidth: 1.5,
    borderColor: '#ccc',
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9'
  },
  selected: {
    backgroundColor: '#6200ee',
    borderColor: '#6200ee',
  },
  ratingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333'
  },
  selectedText: {
    color: '#fff',
  }
});