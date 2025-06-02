import React, { useState } from "react";
import { View, FlatList } from "react-native";
import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./style";
import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { useNavigation } from "@react-navigation/native";

export function Home() {
  const [category, setCategory] = useState("");

  const navigation = useNavigation<any>();

  const appointments = [
    {
      id: "1",
      guild: {
        id: "1",
        name: "Lendarios",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 às 20:40h",
      description:
        "É hoje que vamos chegar ao challanger sem perder uma partida da md10",
    },
    {
      id: "2",
      guild: {
        id: "1",
        name: "Lendarios",
        icon: null,
        owner: true,
      },
      category: "1",
      date: "22/06 às 20:40h",
      description:
        "É hoje que vamos chegar ao challanger sem perder uma partida da md10",
    },
  ];

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(): void {
    navigation.navigate("AppointmentDetails");
  }
  function handleAppointmentCreate(): void {
    navigation.navigate("AppointmentCreate");
  }

  return (
    <Background>
      <View style={styles.header}>
        <Profile></Profile>
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>
      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />
      <ListHeader title="Partidas agendadas" subtitle="Total 6" />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.matches}
        data={appointments}
        ItemSeparatorComponent={() => <ListDivider />}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Appointment data={item} onPress={handleAppointmentDetails} />
        )}
        contentContainerStyle={{paddingBottom: 69}}
      />
    </Background>
  );
}
