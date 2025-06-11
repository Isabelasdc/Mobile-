// src/components/Header.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';

export default function Header({ title, navigation }) {
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content title={title} titleStyle={styles.title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6200ee',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});