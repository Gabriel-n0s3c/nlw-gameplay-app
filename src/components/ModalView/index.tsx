import React, { ReactNode } from "react";
import { Modal, ModalProps, TouchableOpacityProps } from "react-native";
import { styles } from "./style";
import { View } from "react-native";
import { Background } from "../Background";

type Props = ModalProps & {
  children: ReactNode;
};

export function ModalView({ children, ...rest }: Props) {
  return (
    <Modal transparent={true} animationType="slide" {...rest}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Background>
            <View style={styles.bar} />
            {children}
          </Background>
        </View>
      </View>
    </Modal>
  );
}
