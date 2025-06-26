import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./style";
import { theme } from "../../global/styles/theme";
import { Image, View } from "react-native";
import DiscordSvg from '../../assets/discord.svg';
const { CDN_IMAGE } = process.env;
type Props = {
  guildId: string;
  iconId: string;
};

export function GuildIcon({ guildId, iconId }: Props) {
  const uri = `${CDN_IMAGE}/icons/${guildId}/${iconId}.png`;
  return (
    <View style={styles.container}>
      {iconId ? (
        <Image source={{ uri }} style={styles.image} resizeMode="cover" />
      ) : (
        <DiscordSvg width={40} height={40}/>
      )}
    </View>
  );
}
