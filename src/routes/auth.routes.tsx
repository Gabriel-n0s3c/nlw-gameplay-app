import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { SignIn } from "../screens/SignIn";

 export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AuthRoutes() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'transparent'
        }
    }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}



