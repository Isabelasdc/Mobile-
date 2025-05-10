import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from 'react-native-vector-icons';

import EscudoScreen from "../screens/EscudoScreen";
import TitulosScreen from "../screens/TitulosScreen";
import JogadoresScreen from "../screens/JogadoresScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="EscudoScreen"
        component={EscudoScreen}
        options={{
          title: "Escudo",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="shield" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen 
        name="JogadoresScreen" 
        component={JogadoresScreen} 
        options={{
          title: "Jogadores",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen 
        name="TitulosScreen" 
        component={TitulosScreen} 
        options={{
          title: "Títulos",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="trophy" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
