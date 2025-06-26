import React, { useContext } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import IllustrationImg from "../../assets/illustration.png";
import { styles } from "./style";
import { ButtonIcon } from "../../components/ButtonIcon";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../routes/app.routes";
import { Background } from "../../components/Background";
import { AuthContext, useAuth } from "../../hooks/Auth";
import { theme } from "../../global/styles/theme";

export function SignIn() {
  type SignInScreenProp = StackNavigationProp<RootStackParamList, "Home">;

  const { loading, signIn } = useAuth();

  async function handleSignIn() {
    try {
      await signIn();
    } catch (error) {}
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
          {loading ? (
            <ActivityIndicator color={theme.colors.primary}/>
          ) : (
            <ButtonIcon title="Entrar com discord" onPress={handleSignIn} />
          )}
        </View>
      </View>
    </Background>
  );
}
