import React, { useCallback, useState } from "react";
import { View, FlatList } from "react-native";
import { styles } from "./style";
import { Profile } from "../../components/Profile";
import { ButtonAdd } from "../../components/ButtonAdd";
import { CategorySelect } from "../../components/CategorySelect";
import { ListHeader } from "../../components/ListHeader";
import { Appointment, AppointmentProps } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLLECTION_APPOINTMENTS } from "../../configs/database";
import { Load } from "../../components/Load";

export function Home() {
  const [category, setCategory] = useState("");
  const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation<any>();

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory("") : setCategory(categoryId);
  }

  function handleAppointmentDetails(appointmentSelected: AppointmentProps): void {
    navigation.navigate("AppointmentDetails", {appointmentSelected});
  }
  function handleAppointmentCreate(): void {
    navigation.navigate("AppointmentCreate");
  }

  async function loadAppointments() {

    const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENTS);
    const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

    if (category) {
      setAppointments(storage.filter((item) => item.category == category));
    } else {
      setAppointments(storage);
    }

    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

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
      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader title="Partidas agendadas" subtitle={`Total ${appointments.length}`} />
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.matches}
            data={appointments}
            ItemSeparatorComponent={() => <ListDivider />}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Appointment data={item} onPress={() => handleAppointmentDetails(item)} />
            )}
            contentContainerStyle={{ paddingBottom: 69 }}
          />
        </>
      )}
    </Background>
  );
}
