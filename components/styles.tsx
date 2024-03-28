import { StyleSheet } from "react-native";

export const  defaultStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fieldLabel: {
        fontFamily: 'Pop',
        fontSize: 17,
        color: '#909090'
    },
    inputField: {
        backgroundColor: '#eeeeee',
        height: 50,
        padding: 16,
        borderRadius: 10
    },
    btn: {
        backgroundColor: "#002695",
        height: 60,
        borderRadius: 13,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontFamily: "PopSb",
        color: '#fff',
        fontSize: 16,
    },
})