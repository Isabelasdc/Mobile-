// import das telas
import HomeScreen from "../screens/HomeScreen";
import ReceitaScreen from "../screens/ReceitaScreen"


// import do stack
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Início", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="ReceitaScreen"
        component={ReceitaScreen}
        options={{ title: "Detalhes da Receita" }}
      />
    </Stack.Navigator>
  );
}
