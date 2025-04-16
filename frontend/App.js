import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from '@context/AuthContext';
import { RideProvider } from '@context/RideContext';
import { StatusBar } from 'expo-status-bar';

// Import your screens here
import LoginScreen from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import HomeScreen from '@screens/HomeScreen';
import RideRequestScreen from '@screens/RideRequestScreen';
import RideStatusScreen from '@screens/RideStatusScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <RideProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen 
              name="Login" 
              component={LoginScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Register" 
              component={RegisterScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="Home" 
              component={HomeScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="RideRequest" 
              component={RideRequestScreen} 
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="RideStatus" 
              component={RideStatusScreen} 
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </RideProvider>
    </AuthProvider>
  );
} 