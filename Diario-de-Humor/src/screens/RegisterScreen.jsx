// src/screens/RegisterScreen.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Header from '../components/Header';
import MoodSelector from '../components/MoodSelector';
import { saveMoodRecord } from '../utils/storage';
import {
  analyzeMoodWithGemini,
  generateReflectionWithGemini
} from '../services/aiService';

const validationSchema = Yup.object({
  description: Yup.string().max(200, 'Descrição muito longa'),
});

export default function RegisterScreen({ navigation }) {
  const [moodLevel, setMoodLevel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [detectedEmotion, setDetectedEmotion] = useState(null);

  const formik = useFormik({
    initialValues: {
      description: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      Keyboard.dismiss();

      if (!moodLevel) {
        alert('Por favor, selecione seu humor.');
        return;
      }

      try {
        setLoading(true);
        setDetectedEmotion(null);

        console.log('📝 Descrição digitada:', values.description);
        console.log('🧠 Nível de humor selecionado:', moodLevel);

        // 🎭 Analisar humor com Gemini
        const dominantEmotion = await analyzeMoodWithGemini(values.description);
        setDetectedEmotion(dominantEmotion);

        // 💬 Gerar reflexão com Gemini
        const reflection = await generateReflectionWithGemini(dominantEmotion, values.description);

        // 📦 Criar registro completo
        const newRecord = {
          id: Date.now().toString(),
          moodLevel,
          description: values.description,
          emotion: dominantEmotion,
          reflection,
          timestamp: new Date().toISOString(),
        };

        console.log('📦 Registro criado:', newRecord);

        // 💾 Salvar no AsyncStorage
        await saveMoodRecord(newRecord);
        console.log('✅ Registro salvo com sucesso');

        alert('Registro salvo com sucesso!');
        navigation.goBack();

      } catch (error) {
        console.error('❌ Erro ao salvar registro:', error.message);
        alert('Erro ao analisar humor. Por favor, tente novamente.');

      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <>
      <Header title="Registrar Humor" />
      <View style={styles.container}>
        <Text style={styles.label}>Como você está se sentindo hoje?</Text>
        <MoodSelector onSelect={setMoodLevel} />

        <TextInput
          placeholder="Descreva como foi seu dia..."
          multiline
          numberOfLines={4}
          value={formik.values.description}
          onChangeText={formik.handleChange('description')}
          onBlur={formik.handleBlur('description')}
          style={styles.input}
          placeholderTextColor="#aaa"
        />

        {formik.touched.description && formik.errors.description && (
          <Text style={styles.error}>{formik.errors.description}</Text>
        )}

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#6200ee" />
            <Text style={styles.loadingText}>Analisando seu humor...</Text>
          </View>
        ) : (
          <Button title="Salvar Registro" onPress={formik.handleSubmit} color="#6200ee" />
        )}

        {detectedEmotion && (
          <View style={styles.feedback}>
            <Text style={styles.feedbackText}>
              🎭 Humor detectado: {detectedEmotion}
            </Text>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  loadingText: {
    marginLeft: 10,
    color: '#6200ee',
  },
  feedback: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 5,
    alignItems: 'center',
  },
  feedbackText: {
    fontSize: 16,
    color: '#2e7d32',
  },
});