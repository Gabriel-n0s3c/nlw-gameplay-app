import React, { useState } from "react";
import { Text, View, Image, StatusBar } from "react-native";
import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./style";
import { ButtonIcon } from "../../components/ButtonIcon";
export function SigIn() {
    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor="transparent"
                barStyle={"light-content"}
                translucent
            />
            <Image
                source={IllustrationImg}
                style={styles.image}
                resizeMode="stretch"
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                    Organize {"\n"}
                    suas jogatinas{"\n"}
                    facilmente
                </Text>

                <Text style={styles.subtitle}>
                    Crie grupos para jogar seus games {"\n"}
                    favoritos com seus amigos
                </Text>
                <ButtonIcon
                    title="Entrar com discord"
                    activeOpacity={0.8} />
            </View>
        </View>
    );
}
