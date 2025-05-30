import React from "react";
import { styles } from "./style";
import { TextInputProps } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function TextArea({ ...rest }: TextInputProps) {
  return (
    <TextInput style={styles.container} {...rest} />
  );
}
