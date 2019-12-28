import React from 'react'
import {Dimensions, StyleSheet, Text} from "react-native";
import {RectButton} from "react-native-gesture-handler";


export default function DishItem(props) {

    const {item} = props;

    return (
        <RectButton style={styles.rectButton} onPress={() => alert(item.description)}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text numberOfLines={2} style={styles.descriptionText}>
                {item.description}
            </Text>
            <Text style={styles.categoryTitleText}>
                {item.category.title}
            </Text>
        </RectButton>
    )
}

const styles = StyleSheet.create({
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
