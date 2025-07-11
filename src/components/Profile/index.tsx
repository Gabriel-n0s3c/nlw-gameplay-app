import React from "react";
import {
  Alert,
  Text,
  View,
} from "react-native";
import { styles } from "./style";
import { Avatar } from "../Avatar";
import { useAuth } from "../../hooks/Auth";
import { RectButton } from "react-native-gesture-handler";

export function Profile() {
  const {user, signOut} = useAuth();

  function handleSignOut(){
    Alert.alert("Logout", 'Deseja sair do GamePlay',
      [
        {
          text: 'Não',
          style: "cancel"
        },
         {
          text: 'Sim',
          onPress: () => signOut()
        }
      ]
    )
  }
  return (
    <View style={styles.container}>

      <RectButton onPress={handleSignOut}>
        <Avatar urlImage={user.avatar}/>
      </RectButton>
      <View>
        <View style={styles.user}>
            <Text  style={styles.greeting}>
                Olá, 
            </Text>
            <Text  style={styles.username}>
                {user.firstName} 
            </Text>
        </View>
        <Text style={styles.message}>
            Hoje é dia de vitória!
        </Text>
      </View>
    </View>
  );
}
