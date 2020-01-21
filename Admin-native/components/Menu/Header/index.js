import React from "react";
import {Icon} from "react-native-elements";
import {AsyncStorage, Dimensions, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "react-navigation-hooks";
import {styles} from "./style";

export default ({navigation}) => {
    const {navigate} = useNavigation();

    const handleCloseAsyncStorage = () => {
        AsyncStorage.clear();

        setTimeout(() => {
            navigate('AuthLoading')
        }, 0)
    };
    return (
        <View style={styles.navigationHeaderContainer}>
            <Icon containerStyle={styles.iconBurger}
                  name='bars'
                  type='font-awesome'
                  color='#E9C294'
                  onPress={() => navigation.openDrawer()}
            />
            <Text style={{bottom: 15, position: 'absolute', right: 15, color: '#E9C294',}} onPress={() => handleCloseAsyncStorage()}>Close session</Text>
        </View>
    )
}
