import React, {useEffect} from 'react'
import {AsyncStorage, View, ActivityIndicator, StatusBar, ImageBackground} from 'react-native';
import {useNavigation} from 'react-navigation-hooks'
import {styles} from './style';

export default function AuthLoadingScreen() {

    const {navigate} = useNavigation();
    /**
     * @desc Функция для получения токена с AsyncStorage и перенаправление в соответствующий раздел
     * зависящей от прав пользователя
     */

    const getPermission = async () => {
        try {
            const value = await AsyncStorage.getItem('permission');
            if (value !== null) {
                if (value === 'admin') {
                    navigate('AdminStore');
                } else if (value === 'cook') {
                    navigate('Cook');
                } else if (value === 'waiter') {
                    navigate('Waiter');
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
            <ImageBackground source={require('../../img/bgc.jpg')} style={styles.projectBgc}>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </ImageBackground>
        </View>
    )

}

