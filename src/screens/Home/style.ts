import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const styles = StyleSheet.create({
    header: {
        width: '100%',
        padding: 24,
        flexDirection:'row',
        justifyContent: "space-between",
        marginTop: getStatusBarHeight() + 26,
        marginBottom: 42
    },
    title:{
        color:theme.colors.heading,
        textAlign: "center",
        fontSize:40,
        marginBottom:16,
        fontFamily: theme.fonts.title700,
        lineHeight:40
    },
    subtitle:{
        color:theme.colors.heading,
        fontSize:15, 
        textAlign: 'center',
        marginBottom:64,
        fontFamily: theme.fonts.title500,
        lineHeight:25
    },
    matches:{
        marginTop:24,
        marginLeft:24,
    }
})