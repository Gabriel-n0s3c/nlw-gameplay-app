import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { BorderlessButton, FlatList } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";
import BannerImg from "../../assets/banner.png";
import { ListHeader } from "../../components/ListHeader";
import { Member } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";

export type Props = {
  title: string;
  subtitle: string;
};
export function AppointmentDetails({
  title = "Lendários",
  subtitle = "É hoje que vamos chegar ao challanger sem perder uma partida da md10",
}: Props) {
  const members = [
    {
      id: "1",
      username: "Gabriel",
      avatar_url: "https://github.com/gabriel-n0s3c.png",
      status: "online",
    },
    {
      id: "2",
      username: "Gabriel",
      avatar_url: "https://github.com/gabriel-n0s3c.png",
      status: "offline",
    },
  ];
  const navigation = useNavigation<any>();

  function handleShare() {
    navigation.navigate("Home");
  }

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          <BorderlessButton>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
      </ImageBackground>

      <ListHeader title="Jogadores" subtitle="Total 3"></ListHeader>

      <FlatList
        style={styles.members}
        data={members}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <ListDivider />}
        renderItem={({ item }) => <Member data={item} />}
      ></FlatList>

      <View style={styles.footer}>
        <ButtonIcon title="Entrar na partida" />
      </View>
    </Background>
  );
}
