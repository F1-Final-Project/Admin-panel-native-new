import React from 'react'
import {
    Text,
    TouchableHighlight,
    Alert,
    ScrollView,
    StyleSheet,
    Dimensions, ImageBackground,
} from "react-native";

import {TextInput} from 'react-native-paper';

export default function IngredientsStoreScreen() {

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ImageBackground source={require('../img/bgc.jpg')} style={styles.projectBgc}>
                <Text>Dish store</Text>
            </ImageBackground>
        </ScrollView>
    )
}

const {height, width} = Dimensions.get("window");

const styles = StyleSheet.create({
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
    projectBgc: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});
