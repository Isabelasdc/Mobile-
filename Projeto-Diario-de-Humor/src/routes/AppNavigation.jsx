// src/routes/AppNavigator.jsx
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

// Telas
import HomeScreen from '../screens/HomeScreen';
import RegisterHumorScreen from '../screens/RegisterHumorScreen';
import HistoryScreen from '../screens/HistoryScreen';
import SuggestionScreen from '../screens/SuggestionScreen';
import AnalysisScreen from '../screens/AnalysisScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterUserScreen from '../screens/RegisterUserScreen';

// Funções de autenticação
import { getUser } from '../utils/auth';

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
      <Tab.Screen name="Registrar Humor" component={RegisterHumorScreen} options={{ tabBarLabel: 'Registrar' }} />
      <Tab.Screen name="Sugestões" component={SuggestionScreen} options={{ tabBarLabel: 'Sugestões' }} />
      <Tab.Screen name="Histórico" component={HistoryScreen} options={{ tabBarLabel: 'Histórico' }} />
      <Tab.Screen name="Análises" component={AnalysisScreen} options={{ tabBarLabel: 'Análises' }} />
      <Tab.Screen name="Perfil" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  // Verifica se o usuário já está logado
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getUser();
      setInitialRoute(user?.authenticated ? 'Principal' : 'Login');
    };

    checkAuth();
  }, []);

  if (!initialRoute) {
    return null; // Carregando...
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={initialRoute}>
        {/* Tela de login */}
        <Stack.Screen name="Login" component={LoginScreen} />

        {/* Tela de registro */}
        <Stack.Screen name="RegisterUser" component={RegisterUserScreen} />

        {/* Navegação protegida com BottomTab */}
        <Stack.Screen name="Principal" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}