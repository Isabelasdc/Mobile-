import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';
import EscudoScreen from './screens/EscudoScreen';
import { StyleSheet } from 'react-native';
import JogadoresScreen from './screens/JogadoresScreen';
import TitulosScreen from './screens/TitulosScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator>
          {/* EscudoScreen */}
          <Tab.Screen
            name="EscudoScreen"
            component={EscudoScreen}
            options={{
              title: 'Time',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'white',
              },
              tabBarInactiveTintColor: 'black',
              tabBarActiveTintColor: 'pink',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="shield" color={color} size={size} />
              ),
            }}
          />

          {/* JogadoresScreen */}
          <Tab.Screen
            name="JogadoresScreen"
            component={JogadoresScreen}
            options={{
              title: 'Jogadores',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'white',
              },
              tabBarInactiveTintColor: 'black',
              tabBarActiveTintColor: 'pink',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="people" color={color} size={size} />
              ),
            }}
          />

          {/* TitulosScreen */}
          <Tab.Screen
            name="TituloScreen"
            component={TitulosScreen}
            options={{
              title: 'Títulos',
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: 'white',
              },
              tabBarInactiveTintColor: 'black',
              tabBarActiveTintColor: 'pink',
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="trophy" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
