import {StyleSheet, Dimensions} from "react-native";

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    wrap: {
        width: screenWidth,
        height: screenHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});