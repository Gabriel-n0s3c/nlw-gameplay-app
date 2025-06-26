import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthRoutes } from "./auth.routes";
import { useAuth } from "../hooks/Auth";
import { SignIn } from "../screens/SignIn";

export function Routes() {
  const { user } = useAuth();

  console.log(user);
  
  return (

    <NavigationContainer>
      
      {user?.id ? <AuthRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
