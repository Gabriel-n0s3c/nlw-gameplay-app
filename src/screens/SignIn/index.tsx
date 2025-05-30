import React from "react";
import { Text, View, Image } from "react-native";
import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./style";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/auth.routes";
import { Background } from "../../components/Background";

export function SignIn() {
  type SignInScreenProp = StackNavigationProp<RootStackParamList, "Home">;

  const navigation = useNavigation<SignInScreenProp>();

  function handleSignIn() {
    navigation.navigate("Home");
  }

  return (
    <Background>
      <View style={styles.container}>
        <Image
          source={IllustrationImg}
          style={styles.image}
          resizeMode="stretch"
        />

        <View style={styles.content}>
          <Text style={styles.title}>
            Conecte-se {"\n"}e organize suas{"\n"}
            jogatinas
          </Text>

          <Text style={styles.subtitle}>
            Crie grupos para jogar seus games {"\n"}
            favoritos com seus amigos
          </Text>
          <ButtonIcon title="Entrar com discord" onPress={handleSignIn} />
        </View>
      </View>
    </Background>
  );
}
