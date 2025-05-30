import React from "react";
import { styles } from "./style";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function SmallNumberInput({ ...rest }: TextInputProps) {
  return (
    <TextInput keyboardType="numeric" style={styles.container} {...rest} />
  );
}
