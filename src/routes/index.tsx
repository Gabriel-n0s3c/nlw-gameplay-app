import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppRoutes } from "./app.routes";
import { useAuth } from "../hooks/Auth";
import { SignIn } from "../screens/SignIn";
import { Load } from "../components/Load";

export function Routes() {
  const { user, loading } = useAuth();
  return (
    <NavigationContainer>
      {loading ? <Load /> : user?.id ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
