import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 56,
        backgroundColor: theme.colors.primary,
        borderRadius: 8,
        flexDirection: 'row',
        alignItems: "center"

    },

    title: {
        flex: 1,
        color: theme.colors.heading,
        textAlign: "center",
        fontSize: 15,
        fontFamily: theme.fonts.text500
    },
   
})