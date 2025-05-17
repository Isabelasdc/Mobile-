import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import MegaSenaScreen from './Screens/MegaSenaScreen';
import JogoDoBichoScreen from './Screens/JogoDoBichoScreen'



const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ee' },
          headerTintColor: '#fff',
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: '#888',
          tabBarStyle: { paddingBottom: 5, height: 60 },
        }}
      >
        <Tab.Screen
          name="Mega Sena"
          component={MegaSenaScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="numeric" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Jogo do Bicho"
          component={JogoDoBichoScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cow" color={color} size={size} />
            ),
          }}
        />
     
      </Tab.Navigator>
    </NavigationContainer>
  );
}
