import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Portal, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddActivityModal({ visible, hideModal, activityData, onSave }) {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [participants, setParticipants] = useState('1');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (activityData) {
      setName(activityData.name || '');
      setType(activityData.type || '');
      setParticipants(String(activityData.participants || '1'));
      setDuration(activityData.duration || '');
      setDate(activityData.date ? new Date(activityData.date) : new Date());
    } else {
      setName('');
      setType('');
      setParticipants('1');
      setDuration('');
      setDate(new Date());
    }
    setErrors({});
  }, [activityData, visible]); // Adicionado `visible` para limpar erros ao reabrir

  const handleSave = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'O nome da atividade é obrigatório.';
    if (!type.trim()) newErrors.type = 'O tipo da atividade é obrigatório.';
    if (!duration.trim()) newErrors.duration = 'A duração é obrigatória.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const formData = {
      id: activityData?.id,
      name,
      type,
      participants: parseInt(participants, 10) || 1,
      duration,
      date: date.toISOString(),
    };
    onSave(formData);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  return (
    <Portal>
      <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.modalTitle}>{activityData?.id ? 'Editar Atividade' : 'Nova Atividade'}</Text>

          <Text style={styles.label}>Qual é a atividade?</Text>
          {/* MUDANÇA AQUI: Aplicando o estilo de erro dinamicamente */}
          <TextInput
            placeholder="Ex: Corrida no parque"
            value={name}
            onChangeText={setName}
            style={[styles.input, errors.name && styles.inputError]}
          />
          {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

          <Text style={styles.label}>Tipo de Atividade</Text>
           {/* MUDANÇA AQUI: Aplicando o estilo de erro dinamicamente */}
          <TextInput
            placeholder="Ex: Esporte, Lazer, Estudo"
            value={type}
            onChangeText={setType}
            style={[styles.input, errors.type && styles.inputError]}
          />
          {errors.type && <Text style={styles.errorText}>{errors.type}</Text>}
          
          <Text style={styles.label}>Duração Estimada</Text>
           {/* MUDANÇA AQUI: Aplicando o estilo de erro dinamicamente */}
          <TextInput
            placeholder="Ex: 30 minutos, 1 hora"
            value={duration}
            onChangeText={setDuration}
            style={[styles.input, errors.duration && styles.inputError]}
          />
          {errors.duration && <Text style={styles.errorText}>{errors.duration}</Text>}

          <Text style={styles.label}>Número de Participantes</Text>
          <TextInput
            value={participants}
            onChangeText={setParticipants}
            style={styles.input}
            keyboardType="numeric"
          />
          
          <Text style={styles.label}>Data da Atividade</Text>
          <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
            <Icon name="calendar" size={18} color="#333" style={{ marginRight: 10 }} />
            <Text style={styles.dateButtonText}>{date.toLocaleDateString('pt-BR')}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}

          <View style={styles.modalButtons}>
            <Button title="Salvar" onPress={handleSave} />
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc', // Cor padrão da borda
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 5, // Reduzido para dar espaço ao texto de erro
  },
  inputError: {
    borderColor: 'red', // Borda vermelha quando houver erro
  },
  dateButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    flexDirection: 'row',
  },
  dateButtonText: { color: '#333', fontWeight: 'bold', fontSize: 16 },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 30, paddingTop: 15, borderTopWidth: 1, borderTopColor: '#f0f0f0' },
  // MUDANÇA AQUI: Estilo do texto de erro ajustado
  errorText: {
    color: 'red',
    fontSize: 12,
    // removemos o margin negativo e usamos um marginBottom para espaçamento
    marginBottom: 10, 
    marginLeft: 2, // Pequeno ajuste para alinhar com o input
  },
});