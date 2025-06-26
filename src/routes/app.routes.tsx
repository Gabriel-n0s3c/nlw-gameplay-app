import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { theme } from "../global/styles/theme";
import { AppointmentDetails } from "../screens/AppointmentDetails";
import { AppointmentCreate } from "../screens/AppointmentCreate";

 export type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
  AppointmentDetails: undefined;
  AppointmentCreate: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        }
    }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="AppointmentDetails" component={AppointmentDetails} />
      <Stack.Screen name="AppointmentCreate" component={AppointmentCreate} />
    </Stack.Navigator>
  );
}



