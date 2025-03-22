import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PrimeiroComponente from "./componentes/PrimeiroComponente";
import SegundoComponente from "./componentes/SegundoComponente";
import TerceiroComponente from "./componentes/TerceiroComponente";
import JavascriptComponente from "./componentes/JavascriptComponente";
import Perfil from "./componentes/Perfil";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <PrimeiroComponente />
      <SegundoComponente />
      <TerceiroComponente />
      <JavascriptComponente />
      <Perfil nome="Isabela" idade={20} email="maria@gmail.com" />
      <Perfil nome="Isabela" idade={20} email="maria@gmail.com" />
      <Perfil nome="Isabela" idade={20} email="maria@gmail.com" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ADD8E6",
    alignItems: "center",
    justifyContent: "center",
  },
});
