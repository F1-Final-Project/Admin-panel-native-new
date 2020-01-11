import {Dimensions, StyleSheet} from "react-native";


const {height, width} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        position: "absolute",
        height: height,
        width: width,
        bottom: -height,
        backgroundColor: '#212121'
    },
    modalContent: {
        flex: 1,
        alignItems: "stretch",
        paddingTop: 30
    },
    closeText: {
        fontSize: 17,
        color: "#E9C294",
    }
});
