// src/components/EditMoodModal.jsx

import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import MoodSelector from './MoodSelector';
import SonoSelector from './SonoSelector';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importando o ícone

export default function EditMoodModal({ visible, hideModal, moodData, onSave }) {
  const [description, setDescription] = useState('');
  const [weather, setWeather] = useState('');
  const [moodLevel, setMoodLevel] = useState(3);
  const [sleepQuality, setSleepQuality] = useState(3);
  const [photo, setPhoto] = useState(null);

  useEffect(() => {
    if (moodData) {
      setDescription(moodData.description || '');
      setWeather(moodData.weather || '');
      setMoodLevel(moodData.moodLevel || 3);
      setSleepQuality(moodData.sleepQuality || 3);
      setPhoto(moodData.photo || null);
    }
  }, [moodData]);

  const handleSave = () => {
    const formData = {
      id: moodData.id,
      description,
      weather,
      moodLevel,
      sleepQuality,
      photo,
    };
    onSave(formData);
  };

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à sua câmera para tirar uma foto.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({ allowsEditing: true, aspect: [4, 3], quality: 1 });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  if (!moodData) {
    return null;
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.modalTitle}>{moodData.id ? 'Editar Registro' : 'Novo Registro'}</Text>

          <MoodSelector onSelect={setMoodLevel} selected={moodLevel} />
          <SonoSelector onRate={setSleepQuality} selectedRating={sleepQuality} />

          <Text style={styles.label}>Descreva como foi seu dia</Text>
          <TextInput
            placeholder="Exemplo: Hoje fui caminhar e almocei com amigos"
            value={description}
            onChangeText={setDescription}
            style={styles.inputDescription}
            multiline
          />

          <Text style={styles.label}>Como está o clima hoje?</Text>
          <TextInput
            placeholder="Ex: Ensolarado, frio..."
            value={weather}
            onChangeText={setWeather}
            style={styles.input}
          />

          <Text style={styles.label}>Quer registrar uma foto que represente seu dia?</Text>

          {/* Botão com ícone */}
          <TouchableOpacity style={styles.photoButton} onPress={openCamera}>
            <Icon name="camera" size={18} color="#333" style={{ marginRight: 10 }} />
            <Text style={styles.photoButtonText}>
              {photo ? 'Alterar Foto' : 'Tirar Foto'}
            </Text>
          </TouchableOpacity>

          {photo && (
            <View style={styles.previewWrapper}>
              <Image source={{ uri: photo }} style={styles.imagePreview} />
              <TouchableOpacity onPress={() => setPhoto(null)}>
                <Text style={styles.removePhotoText}>Remover Foto</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.modalButtons}>
            <Button title="Salvar Registro" onPress={handleSave} />
            <Button title="Cancelar" onPress={hideModal} color="#888" />
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  modalContainer: { backgroundColor: '#fff', padding: 20, margin: 20, borderRadius: 10, maxHeight: '90%' },
  modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
  label: { fontSize: 16, fontWeight: '600', color: '#444', marginBottom: 8, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16 },
  inputDescription: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, marginBottom: 15, fontSize: 16, minHeight: 120, textAlignVertical: 'top' },
  photoButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center', // Adicionado para centralizar
    marginVertical: 10,
    flexDirection: 'row', // Adicionado para alinhar ícone e texto
  },
  photoButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  previewWrapper: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
  removePhotoText: {
    color: '#ef5350',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
});