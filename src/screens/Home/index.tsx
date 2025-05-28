import React from "react";
import { Text, View, Image } from "react-native";
import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./style";
import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";

export function Home() {

    const url = IllustrationImg
    return (
        <View >
            <View style={styles.header}>
                <Profile></Profile>
                <ButtonAdd/>
            </View>
        </View>
    );
}
