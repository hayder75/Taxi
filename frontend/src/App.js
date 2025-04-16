import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DestinationForm from "./screens/DestinationForm";
import Map from "./screens/Map";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DestinationForm">
        <Stack.Screen
          name="DestinationForm"
          component={DestinationForm}
          options={{ title: "Where Are You Going?" }}
        />
        <Stack.Screen
          name="MapScreen"
          component={Map}
          options={{ title: "Your Route" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
