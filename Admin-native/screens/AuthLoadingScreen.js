import React, {useEffect} from 'react'
import {AsyncStorage, View, ActivityIndicator, StatusBar, StyleSheet, ImageBackground} from 'react-native';
import {useNavigation} from 'react-navigation-hooks'

export default function AuthLoadingScreen() {

    const {navigate} = useNavigation();

    const getPermission = async () => {
        try {
            const value = await AsyncStorage.getItem('permission');
            if (value !== null) {
                if (value === 'admin') {
                    navigate('AdminStore');
                } else if (value === 'cook') {
                    navigate('AdminStore');
                } else if (value === 'waiter') {
                    navigate('AdminStore');
                }
            } else {
                navigate('Auth');
            }
        } catch (error) {
            console.error(error)
        }
    };

    useEffect(() => {
        getPermission()
    }, []);

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../img/bgc.jpg')} style={styles.projectBgc}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </ImageBackground>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#212121'
    },
    projectBgc: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
