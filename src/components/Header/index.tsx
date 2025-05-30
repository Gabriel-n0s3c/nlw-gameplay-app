import React, { ReactNode } from "react";
import { styles } from "./style";
import { BorderlessButton, ScrollView } from "react-native-gesture-handler";
import { categories } from "../../utils/categories";
import { Category } from "../Category";
import { Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../global/styles/theme";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Props = {
  title: string;
  action?: ReactNode;
};
export function Header({ title, action }: Props) {
  const { secondary40, secondary100, heading } = theme.colors;
  
  const navigation = useNavigation();


  function handleGoBack(): void {
    navigation.goBack();
  }

  return (
    <LinearGradient
      style={styles.container}
      colors={[secondary100, secondary40]}
    >
      <BorderlessButton
      onPress={handleGoBack}>
        <Feather name="arrow-left" size={24} color={heading} />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>

      {action && 
      (
        <View>
          {action}
        </View>
      )}
    </LinearGradient>
  );
}
