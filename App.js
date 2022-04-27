import { View, Text, Button } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import SignupScreen from './signupScreen';
import LoginScreen from './loginScreen';
import Homescreen from './Home';
import Menu from './Menu';
import Profile from './Profile';
const Stack = createStackNavigator();
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Homescreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#ff0065' },
        }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#ff0065' },
        }}
      />
      <Stack.Screen
        name="Menu"
        component={Menu}
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#ff0065' },
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerTintColor: '#fff',
          headerStyle: { backgroundColor: '#ff0065' },
        }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}