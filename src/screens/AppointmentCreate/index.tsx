import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

import uuid from "react-native-uuid";
import { Background } from "../../components/Background";
import { Header } from "../../components/Header";
import { styles } from "./style";
import { CategorySelect } from "../../components/CategorySelect";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { theme } from "../../global/styles/theme";
import { GuildIcon } from "../../components/GuildIcon";
import { SmallNumberInput } from "../../components/SmallNumberInput";
import { TextArea } from "../../components/TextArea";
import { Button } from "../../components/Button";
import { Guilds } from "../../components/Guilds";
import { ModalView } from "../../components/ModalView";
import { GuildProps } from "../../components/Guild";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { useNavigation } from "@react-navigation/native";

export function AppointmentCreate() {
  const [category, setCategory] = useState("");
  const [openGuildsModal, setopenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [description, setDescription] = useState("");

  const navigation = useNavigation<any>();

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleOpenGuildsModal() {
    setopenGuildsModal(true);
  }

  function handleCloseGuildsModal() {
    setopenGuildsModal(false);
  }
  function handleGuildSelected(guildSelected: GuildProps) {
    setGuild(guildSelected);
    setopenGuildsModal(false);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4,
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };

    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);

    const appointments = storage ? JSON.parse(storage) : [];

    AsyncStorage.setItem(
      COLLECTION_APPOINTMENTS,
      JSON.stringify([...appointments, newAppointment])
    );

    navigation.navigate("Home");
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
            hasCheckBox
          />

          <View style={styles.form}>
            <RectButton onPress={handleOpenGuildsModal}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : "Selecione um servidor"}
                  </Text>
                </View>
                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  {" "}
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallNumberInput maxLength={2} onChangeText={setDay} />
                  <Text style={styles.divider}> / </Text>
                  <SmallNumberInput maxLength={2} onChangeText={setMonth} />
                </View>
              </View>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  {" "}
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallNumberInput maxLength={2} onChangeText={setHour} />
                  <Text style={styles.divider}> : </Text>
                  <SmallNumberInput maxLength={2} onChangeText={setMinute} />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}> Descrição</Text>
              <Text style={styles.caracteresLimit}> Max 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              scrollEnabled={false}
              onChangeText={setDescription}
            />
            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave}/>
            </View>
          </View>
        </ScrollView>
      </Background>
      <ModalView visible={openGuildsModal} closeModal={handleCloseGuildsModal}>
        <Guilds handleGuildSelected={handleGuildSelected} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
