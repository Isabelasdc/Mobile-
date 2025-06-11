import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  Button, 
  FlatList, 
  TouchableOpacity, 
  Image, 
  StyleSheet, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import Header from '../components/Header';
import EditMoodModal from '../components/EditMoodModal';
import { analyzeMoodWithGemini, generateReflectionWithGemini } from '../services/aiService';
import { saveMoodRecord, getMoodRecords, updateMoodRecord, deleteMoodRecord } from '../utils/storage';

// NOVO: Mapeamento de emoji por nível de humor para exibição
const moodEmojiMap = {
  1: '😢',
  2: '😕',
  3: '😊',
  4: '😄',
};

export default function RegisterHumorScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeRecord, setActiveRecord] = useState(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      const data = await getMoodRecords();
      const sortedData = data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRecords(sortedData || []);
      setLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

  const openModal = useCallback((record) => {
    const recordData = record ? record : { id: null, description: '', weather: '', moodLevel: 3, sleepQuality: 3, photo: null };
    setActiveRecord(recordData);
    setModalVisible(true);
  }, []);

  const handleSaveRecord = useCallback(async (formData) => {
    setModalVisible(false);
    setLoading(true);
    try {
      if (formData.id) {
        const recordToUpdate = { ...formData, timestamp: new Date().toISOString() };
        await updateMoodRecord(formData.id, recordToUpdate);
        const updatedList = records.map((r) => (r.id === formData.id ? recordToUpdate : r));
        setRecords(updatedList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        alert('Registro atualizado!');
      } else {
        if (!formData.description?.trim()) {
          alert('Por favor, descreva seu dia.');
          setLoading(false);
          return;
        }
        const dominantEmotion = await analyzeMoodWithGemini(formData.description);
        const reflection = await generateReflectionWithGemini(dominantEmotion, formData.description);
        const newRecord = { ...formData, id: Date.now().toString(), emotion: dominantEmotion, reflection, timestamp: new Date().toISOString() };
        await saveMoodRecord(newRecord);
        const updatedRecords = [newRecord, ...records];
        setRecords(updatedRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
        alert('Registro salvo!');
      }
    } catch (error) {
      console.error("Erro ao salvar: ", error);
      alert('Erro ao processar o registro.');
    } finally {
      setLoading(false);
    }
  }, [records]);

  const handleDelete = useCallback(async (recordId) => {
    Alert.alert("Confirmar Exclusão", "Tem certeza?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Excluir", style: "destructive", onPress: async () => {
        await deleteMoodRecord(recordId);
        const updatedList = records.filter((r) => r.id !== recordId);
        setRecords(updatedList);
      }},
    ]);
  }, [records]);

 // o card para mostrar mais detalhes
  const renderItem = ({ item }) => (
    <View style={styles.recordCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.recordItem}>
          <Text style={styles.boldLabel}>Seu Humor:</Text> {moodEmojiMap[item.moodLevel] || '😐'}
        </Text>
        <Text style={styles.recordItem}>
          <Text style={styles.boldLabel}>Sono:</Text> {item.sleepQuality}/5 ★
        </Text>
      </View>
      <Text style={styles.recordItem}><Text style={styles.boldLabel}>🧠 Humor Detectado:</Text> {item.emotion}</Text>
      <Text style={styles.recordItem}><Text style={styles.boldLabel}>📝 Descrição:</Text> {item.description}</Text>
      
      {/* NOVO: Exibição da reflexão da IA */}
      <Text style={styles.recordReflection}>
        <Text style={styles.boldLabel}>💡 Reflexão da IA:</Text> {item.reflection}
      </Text>

      <Text style={styles.recordTimestamp}>Registrado em: {new Date(item.timestamp).toLocaleString('pt-BR', {day: '2-digit', month: 'long', hour: '2-digit', minute: '2-digit'})}</Text>
      
      {item.photo && <Image source={{ uri: item.photo }} style={styles.recordPhoto} />}
      
      <View style={styles.recordActions}>
        <Button title="Editar" onPress={() => openModal(item)} color="#ffa728" />
        <Button title="Excluir" onPress={() => handleDelete(item.id)} color="#ef5350" />
      </View>
    </View>
  );

  return (
    <>
      <Header title="Registrar Humor" />
      <View style={styles.container}>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.registerButton} onPress={() => openModal(null)}>
            <Text style={styles.registerButtonText}>Fazer Registro</Text>
          </TouchableOpacity>
        </View>

        {loading && records.length === 0 ? <ActivityIndicator size="large" color="#6200ee" style={{ marginTop: 50 }} /> : (
          <FlatList
            data={records}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={<Text style={styles.emptyText}>Nenhum registro encontrado.</Text>}
          />
        )}
      </View>

      {modalVisible && <EditMoodModal visible={modalVisible} hideModal={() => setModalVisible(false)} moodData={activeRecord} onSave={handleSaveRecord} />}
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  headerActions: { padding: 15, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  registerButton: { backgroundColor: '#6200ee', paddingVertical: 15, borderRadius: 8, alignItems: 'center', elevation: 3 },
  registerButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  listContent: { padding: 15 },
  emptyText: { textAlign: 'center', color: '#888', marginTop: 50, fontSize: 16 },
  recordCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, elevation: 2, marginBottom: 15 },
  cardHeader: { // NOVO: Estilo para o cabeçalho do card
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  recordItem: { fontSize: 16, lineHeight: 24, color: '#333' },
  boldLabel: { fontWeight: 'bold' },
  recordReflection: { // NOVO: Estilo para a reflexão
    fontSize: 15,
    fontStyle: 'italic',
    color: '#2e7d32',
    marginTop: 10,
    backgroundColor: '#f0fff4',
    padding: 10,
    borderRadius: 5,
  },
  recordTimestamp: { // NOVO: Estilo para o horário
    fontSize: 12,
    color: '#888',
    marginTop: 15,
    textAlign: 'right',
  },
  recordPhoto: { width: '100%', height: 200, borderRadius: 10, marginTop: 10 },
  recordActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 10, marginTop: 15, paddingTop: 10, borderTopWidth: 1, borderColor: '#f0f0f0' },
});