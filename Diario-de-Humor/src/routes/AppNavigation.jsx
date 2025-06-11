// src/routes/AppNavigator.jsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Telas
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SuggestionsScreen from '../screens/SuggestionScreen';
import AnalysisScreen from '../screens/AnalysisScreen';  
import ProfileScreen from '../screens/ProfileScreen';    

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Registrar Humor') {
            iconName = 'emoticon-happy';
          } else if (route.name === 'Sugestões') {
            iconName = 'lightbulb-on';
          } else if (route.name === 'Histórico') {
            iconName = 'history';
          } else if (route.name === 'Análises') {
            iconName = 'chart-line';
          } else if (route.name === 'Perfil') {
            iconName = 'account';
          }

          return <MaterialCommunityIcons name={iconName} color={color} size={size} />;
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Início' }} />
      <Tab.Screen name="Registrar Humor" component={RegisterScreen} options={{ tabBarLabel: 'Humor' }} />
      <Tab.Screen name="Sugestões" component={SuggestionsScreen} options={{ tabBarLabel: 'Sugestões' }} />
      <Tab.Screen name="Histórico" component={HistoryScreen} options={{ tabBarLabel: 'Histórico' }} />
      <Tab.Screen name="Análises" component={AnalysisScreen} options={{ tabBarLabel: 'Análises' }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Principal" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}