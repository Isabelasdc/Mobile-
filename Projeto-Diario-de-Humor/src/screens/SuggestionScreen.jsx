import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import Header from "../components/Header";
import { getSuggestionByEmotion } from "../services/boredApi";
import { getMoodRecords } from "../utils/storage";
import { mapTypeToPortuguese, getDurationText } from "../utils/translator";
import { translateToPortuguese } from "../services/aiService";
import AddActivityModal from "../components/AddActivityModal";
import {
  saveActivityRecord,
  getActivityRecords,
  updateActivityRecord,
  deleteActivityRecord,
} from "../utils/activityStorage";

// A variável de "memória" para o ID do humor é uma abordagem válida para este caso de uso.
let lastProcessedMoodId = null;

export default function SuggestionsScreen({ navigation }) {
  const [suggestions, setSuggestions] = useState([]);
  const [customActivities, setCustomActivities] = useState([]);
  const [dominantEmotion, setDominantEmotion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const fetchCustomActivities = useCallback(async () => {
    try {
      const activities = await getActivityRecords();
      setCustomActivities(activities.sort((a, b) => new Date(b.date) - new Date(a.date)));
    } catch (err) {
      console.error("Erro ao buscar atividades customizadas:", err);
    }
  }, []);

  const fetchSuggestionData = useCallback(async (forceUpdate = false) => {
    setLoading(true);
    setError(false);
    try {
      const records = await getMoodRecords();
      if (!records.length) {
        setDominantEmotion("Nenhum registro encontrado");
        setSuggestions([]);
        lastProcessedMoodId = null;
      } else {
        const lastRecord = records[records.length - 1];
        if (lastRecord.id !== lastProcessedMoodId || forceUpdate) {
          console.log("Buscando nova sugestão...");
          lastProcessedMoodId = lastRecord.id;
          const currentEmotion = lastRecord.emotion || "neutro";
          setDominantEmotion(currentEmotion);

          const suggestion = await getSuggestionByEmotion(currentEmotion);
          if (suggestion && !suggestion.error) {
            const translatedActivity = await translateToPortuguese(suggestion.activity);
            setSuggestions([{ ...suggestion, translatedActivity }]);
          } else {
            setSuggestions([]);
          }
        } else {
          console.log("Nenhum registro de humor novo.");
        }
      }
      // Sempre busca as atividades customizadas
      await fetchCustomActivities();
    } catch (err) {
      console.error("❌ Erro ao buscar dados:", err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [fetchCustomActivities]);

  useEffect(() => {
    // Usando o retorno de chamada para evitar recriação da função a cada renderização
    const handleFocus = () => {
      fetchSuggestionData();
    };
    const unsubscribe = navigation.addListener('focus', handleFocus);
    return unsubscribe;
  }, [navigation, fetchSuggestionData]);

  // CORREÇÃO: Função para abrir o modal.
  // Ela define a atividade selecionada (para edição) e torna o modal visível.
  const openModal = (activity) => {
    setSelectedActivity(activity); // Se `activity` for null, é uma nova atividade.
    setModalVisible(true);
  };

  const handleSaveActivity = useCallback(async (formData) => {
    setModalVisible(false);
    try {
      if (formData.id) {
        await updateActivityRecord(formData.id, formData);
        console.log("Atividade atualizada com sucesso!");
      } else {
        const newActivity = { ...formData, id: Date.now().toString() };
        await saveActivityRecord(newActivity);
        console.log("Atividade adicionada com sucesso!");
      }
      await fetchCustomActivities();
    } catch (err) {
      console.error("Erro ao salvar atividade:", err);
      Alert.alert("Erro", "Falha ao salvar a atividade.");
    }
  }, [fetchCustomActivities]);

  const handleDeleteActivity = useCallback(async (id) => {
    Alert.alert("Confirmar Exclusão", "Tem certeza que deseja excluir esta atividade?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          await deleteActivityRecord(id);
          await fetchCustomActivities();
        },
      },
    ]);
  }, [fetchCustomActivities]);

  const renderSuggestionItem = ({ item }) => (
    <View style={styles.suggestionCard}>
      <Text style={styles.activity}>{item.translatedActivity || item.activity}</Text>
      <Text style={styles.label}>Tipo:</Text>
      <Text style={styles.detail}>{mapTypeToPortuguese(item.type)}</Text>
      <Text style={styles.label}>Participantes:</Text>
      <Text style={styles.detail}>{item.participants} pessoa(s)</Text>
      <Text style={styles.label}>Duração:</Text>
      <Text style={styles.detail}>{getDurationText(item.duration)}</Text>
      {item.link && (
        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
          <Text style={styles.link}>🔗 Saiba mais</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderCustomItem = ({ item }) => (
    <View style={styles.suggestionCard}>
      <Text style={styles.activity}>{item.name}</Text>
      <Text style={styles.label}>Tipo:</Text>
      <Text style={styles.detail}>{item.type}</Text>
      <Text style={styles.label}>Duração:</Text>
      <Text style={styles.detail}>{item.duration}</Text>
      <Text style={styles.label}>Participantes:</Text>
      <Text style={styles.detail}>{item.participants} pessoa(s)</Text>
      <Text style={styles.label}>Data:</Text>
      <Text style={styles.detail}>{new Date(item.date).toLocaleDateString("pt-BR")}</Text>
      <View style={styles.actions}>
        {/* CORREÇÃO: Chama a função openModal corretamente */}
        <Button title="Editar" color="#ffa728" onPress={() => openModal(item)} />
        <Button title="Excluir" color="#e53935" onPress={() => handleDeleteActivity(item.id)} />
      </View>
    </View>
  );

  if (loading && !modalVisible) { // Não mostra loading de tela inteira se o modal estiver aberto
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6200ee" />
        <Text style={styles.loadingText}>Carregando sugestões...</Text>
      </View>
    );
  }

  const allActivities = [
    ...(dominantEmotion !== "Nenhum registro encontrado" && suggestions.length > 0
      ? [{ type: "header", title: `Com base no seu último registro (${dominantEmotion}):` }, ...suggestions]
      : []),
    ...(customActivities.length > 0
      ? [{ type: "header", title: "Minhas Atividades:" }, ...customActivities]
      : []),
  ];

  return (
    <View style={styles.mainContainer}>
      <Header title="Sugestões de Atividades" />
      <View style={styles.container}>
        {error ? (
          <View style={styles.centered}>
            <Text style={styles.errorText}>Erro ao carregar sugestões. Tente novamente.</Text>
          </View>
        ) : allActivities.length === 0 && !loading ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhuma sugestão ou atividade encontrada. Registre seu humor ou adicione uma atividade personalizada!</Text>
          </View>
        ) : (
          <FlatList
            data={allActivities}
            keyExtractor={(item, index) => item.id || item.key || `item-${index}`}
            renderItem={({ item }) => {
              if (item.type === "header") {
                return <Text style={styles.subtitle}>{item.title}</Text>;
              }
              return item.translatedActivity ? renderSuggestionItem({ item }) : renderCustomItem({ item });
            }}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </View>

      {/* CORREÇÃO: Chama a função openModal corretamente */}
      <TouchableOpacity style={styles.fab} onPress={() => openModal(null)}>
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      {/* A renderização do modal permanece a mesma e agora funcionará corretamente */}
      <AddActivityModal
        visible={modalVisible}
        hideModal={() => setModalVisible(false)}
        onSave={handleSaveActivity}
        activityData={selectedActivity}
      />
    </View>
  );
}

// Seus estilos permanecem os mesmos
const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { flex: 1, paddingHorizontal: 20 },
  subtitle: { fontSize: 18, marginTop: 20, marginBottom: 10, fontWeight: "bold", color: "#333" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  loadingText: { marginTop: 10, color: "#6200ee", fontSize: 16 },
  errorText: { textAlign: "center", color: "#e53935", fontSize: 16 },
  emptyContainer: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emptyText: { textAlign: "center", color: "#777", fontSize: 16, lineHeight: 24 },
  suggestionCard: { backgroundColor: "#fff", borderRadius: 10, padding: 15, marginBottom: 15, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  label: { fontWeight: "bold", marginTop: 8, color: "#555", fontSize: 14 },
  activity: { fontSize: 18, fontWeight: "bold", marginBottom: 10, color: "#333" },
  detail: { fontSize: 15, color: "#666", marginBottom: 5 },
  link: { marginTop: 10, color: "#6200ee", fontWeight: "bold", fontSize: 15 },
  actions: { flexDirection: "row", justifyContent: "flex-end", marginTop: 10, gap: 10 },
  fab: { position: "absolute", width: 60, height: 60, alignItems: "center", justifyContent: "center", right: 30, bottom: 30, backgroundColor: "#6200ee", borderRadius: 30, elevation: 8, shadowColor: "#000", shadowRadius: 5, shadowOpacity: 0.3, shadowOffset: { width: 0, height: 2 } },
  fabIcon: { fontSize: 30, color: "white", lineHeight: 30 },
});