import React from "react";
import { Text, View, Image } from "react-native";
import DiscordImg from "../../assets/discord.png";
import { styles } from "./style";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";

type Props = RectButtonProps;
export function ButtonAdd({...rest}: RectButtonProps) {


    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <MaterialCommunityIcons
            name="plus"
            color={theme.colors.heading}
            size={24}/>
        </RectButton>
    );
}
