import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, Share, Text, View, Platform } from "react-native";
import { styles } from "./style";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { BorderlessButton, FlatList } from "react-native-gesture-handler";
import { Fontisto } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";
import BannerImg from "../../assets/banner.png";
import { ListHeader } from "../../components/ListHeader";
import { Member, MemberProps } from "../../components/Member";
import { ListDivider } from "../../components/ListDivider";
import { ButtonIcon } from "../../components/ButtonIcon";
import { AppointmentProps } from "../../components/Appointment";
import { api } from "../../services/api";
import { GuildProps } from "../../components/Guild";
import { Load } from "../../components/Load";
import { openURL } from "expo-linking";

type Params = {
  appointmentSelected: AppointmentProps;
};

type GuildWidget = {
  id: string;
  name: string;
  instant_invite: string;
  members: MemberProps[];
  presence_count: number;
};
export function AppointmentDetails() {
  const [widget, setWidget] = useState<GuildWidget>({} as GuildWidget);
  const [loading, setLoading] = useState(true);

  const route = useRoute();

  const { appointmentSelected } = route.params as Params;

  const navigation = useNavigation<any>();

  async function fetchGuildWidget() {
    try {
      const response = await api.get(
        `/guilds/${appointmentSelected.guild.id}/widget.json`
      );

      setWidget(response.data);
    } catch (error) {
      Alert.alert("Verifique se o Widget do serivdor está habilitado");
    } finally {
      setLoading(false);
    }
  }

  function handleShareInvitation() {

    const message = Platform.OS === 'ios' ? 
    `Junte-se a ${appointmentSelected.guild.name}` : widget.instant_invite;

    Share.share({
      message, 
      url: widget.instant_invite
    })
  }

  function handleOpenGuild() {

    openURL(widget.instant_invite);

  }

  useEffect(() => {
    fetchGuildWidget();
  }, []);

  return (
    <Background>
      <Header
        title="Detalhes"
        action={
          appointmentSelected.guild.owner &&
          <BorderlessButton
            onPress={handleShareInvitation}>
            <Fontisto name="share" size={24} color={theme.colors.primary} />
          </BorderlessButton>
        }
      />

      <ImageBackground source={BannerImg} style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.title}>{appointmentSelected.guild.name}</Text>
          <Text style={styles.subtitle}>{appointmentSelected.description}</Text>
        </View>
      </ImageBackground>

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader title="Jogadores" subtitle={`Total ${widget.presence_count ?? 0}`}></ListHeader>

          <FlatList
            style={styles.members}
            data={widget.members}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <ListDivider isCentered />}
            renderItem={({ item }) => <Member data={item} />}
          ></FlatList>

         { 
          
          appointmentSelected.guild.owner &&
          <View style={styles.footer}>
            <ButtonIcon title="Entrar na partida" onPress={handleOpenGuild}/>
          </View>}
        </>
      )}
    </Background>
  );
}
