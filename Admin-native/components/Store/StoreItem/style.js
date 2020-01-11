import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    rectButton: {
        flex: 1,
        height: 80,
        paddingVertical: 10,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        flexDirection: 'column',
        backgroundColor: "rgba(28, 28, 28, .2)",
    },
    titleText: {
        fontWeight: 'bold',
        backgroundColor: 'transparent',
        color: '#E9C294',
    },
    descriptionText: {
        color: '#d0cdc7',
        backgroundColor: 'transparent',
    },
    categoryTitleText: {
        backgroundColor: 'transparent',
        position: 'absolute',
        right: 20,
        top: 10,
        color: '#d0cdc7',
        fontWeight: 'bold',
    },

});
