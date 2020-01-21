import { Image, Text, TouchableOpacity, View} from "react-native";
import {Transition} from "react-navigation-fluid-transitions";
import React from "react";
import {useNavigation} from "react-navigation-hooks";
import {styles} from './style';


export default ({id, data, setContent}) => {
    const {navigate} = useNavigation();
    const {category} = data;

    return (
        <Transition shared={id}>
            <View style={styles.detailTopContainer}>
                <View style={styles.detailTopBottomSubContainer}>
                    <View style={styles.mainHeader}>
                        <Image
                            style={styles.imageItem}
                            source={{
                                uri: category.icon,
                            }}
                        />
                        <Text style={styles.mainTitle}>{category.title}</Text>
                    </View>
                    <Text style={styles.goBack} onPress={() => {
                        setContent('menu')
                    }}>Back</Text>
                </View>
            </View>
        </Transition>
    )
}

