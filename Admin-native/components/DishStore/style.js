import {Dimensions, StyleSheet} from "react-native";

const {height, width} = Dimensions.get("window");

export const styles = StyleSheet.create({
    projectBgc: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: '#212121',
    },
    mainPhrase: {
        marginLeft: 15,
        marginRight: 15,
        marginTop: 10,
        color: '#E9C294',
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    mainContainer: {
        flex: 1,
    },
});
