import React from "react";
import { styles } from "./style";
import { ScrollView } from "react-native-gesture-handler";
import { categories } from "../../utils/categories";
import { Category } from "../Category";
import { Text, View } from "react-native";

type Props = {
  title: string;
  subtitle: string;
};
export function ListHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
