import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
   container:{
      width: '100%',
      flexDirection: "row",
      paddingHorizontal: 24,
      justifyContent:"space-between" ,
      marginTop: 27,
   },
   title:{
      fontFamily: theme.fonts.title700,
      color: theme.colors.heading, 
      fontSize: 18, 
   }, 
   subtitle:{
      fontFamily: theme.fonts.text400,
      color: theme.colors.highlight, 
      fontSize: 13, 
   }
});
