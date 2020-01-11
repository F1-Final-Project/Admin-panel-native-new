import {Dimensions, StyleSheet} from "react-native";

const {height, width} = Dimensions.get("window");

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },
    contentContainer: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authText: {
        fontSize: 30,
        fontWeight: "400",
        color: "#E9C294",
        marginVertical: "7%"
    },
    copyRight: {
        position: "absolute",
        left: "-55%",
        top: "70%",
        fontWeight: "400",
        color: "#E9C294",
    },
    copyRightLink: {
        fontWeight: "400",
        color: "#E9C294",
        textDecorationLine: 'underline'
    },
    authTextField: {
        width: "80%",
        padding: 7,
        backgroundColor: 'rgba(233, 194, 148, 0)'
    },
    authBtn: {
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        height: 50,
        borderWidth: 1,
        borderColor: "#E9C294",
        borderStyle: "solid",
        marginTop: 30,
    },
    authTextBtn: {
        color: "#E9C294"
    },

    projectBgc: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    titleContainer: {
        position: "absolute",
        top: -75
    },
    btnContainerAnimation: {
        position: "absolute",
        left: "10%",
        top: "55%",
        width: width,
    },
    inputContainerAnimation: {
        position: "absolute",
        top: "35%",
        left: "10%",
        width: width,
    },

});
