import { NavigationContainer } from '@react-navigation/native';
import {PaperProvider} from 'react-native-paper';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';
import {Ionicons} from 'react-native-vector-icons'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        
        <Tab.Navigator>
          {/* HomeScreen */}
          <Tab.Screen  
          name='HomeScreen' 
          component={HomeScreen}
          options={{
            title: 'Início',
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: 'white'
            },
            tabBarInactiveTintColor:'black',
            tabBarActiveTintColor: 'pink',
            tabBarIcon: ({color, size}) => <Ionicons name='home' color={color} size={size}/>
          }}
          
          />
          {/* ProfileScreen */}
          <Tab.Screen name='ProfileScreen' component={ProfileScreen}
           options={{
            title: 'Perfil',
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: 'white'
            },
            tabBarInactiveTintColor:'black',
            tabBarActiveTintColor: 'pink',
            tabBarIcon: ({color, size}) => <Ionicons name='person' color={color} size={size}/>
          }}
          
          
          />
          {/* SettingsScreen */}
          <Tab.Screen name='SettingsScreen' component={SettingsScreen}
          options={{
            title: 'Configurações',
            headerTitleAlign: 'center',
            headerStyle:{
              backgroundColor: 'white'
            },
            tabBarInactiveTintColor:'black',
            tabBarActiveTintColor: 'pink',
            tabBarIcon: ({color, size}) => <Ionicons name='cog' color={color} size={size}/>
          }}
          
          
          
          />

        </Tab.Navigator>


      </NavigationContainer>
    </PaperProvider>
  );
}

