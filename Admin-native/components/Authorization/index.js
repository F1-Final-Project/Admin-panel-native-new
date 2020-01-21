import React, {useEffect, useState} from 'react';
import {
    Text,
    TouchableHighlight,
    Alert,
    ScrollView,
    StyleSheet,
    AsyncStorage,
    Dimensions,
    Linking
} from "react-native";
import {ImageBackground} from 'react-native'
import {TextInput} from 'react-native-paper';
import {useNavigation} from "react-navigation-hooks";
import {styles} from './style';


import {
    Animated,
    Easing
} from "react-native";

import ApolloClient, {gql, } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://f1-graphql-node.herokuapp.com/graphql',
});


export default function AuthScreen() {

    const {navigate} = useNavigation();

    const [btnTextColor, setBtnTextColor] = useState("#E9C294");
    const [formValidate, setFormValidate] = useState({
        email: '',
        emailError: '',
        password: '',
        passwordError: ''
    });

    const [submitted, setStateSubmitted] = useState(false);

    const colorShowUnderlay = () => {
        setBtnTextColor("#212121");
    };

    const colorHideUnderlay = () => {
        setBtnTextColor("#E9C294");
    };

    /**
     * @desc Функция для изменения входных данных email
     * @param e - текст ввода в поле
     */

    const handleEmailChange = e => {
        setFormValidate(prevState => {
            return {...prevState, ...{email: e}}
        });
    };

    /**
     * @desc Функция для изменения входных данных password
     * @param e - текст ввода в поле
     */

    const handlePassChange = e => {
        setFormValidate(prevState => {
            return {...prevState, ...{password: e}}
        });

    };

    /**
     * @desc Функция для валидации входных данных.
     * graphql запрос на получения токена после авторизациию
     * Записования его в AsyncStorage и переход по правам доступа в соответствующий раздел
     */

    const onSubmit = () => {
        setStateSubmitted(true);

        if (formValidate.password.trim().length < 3 || formValidate.password.includes('@')) {
            Alert.alert('Password & Email', 'Password and Email must be');
            setStateSubmitted(false);

            return
        }
        client
            .query({
                query: gql`{
                  login(email: "${formValidate.email}", password: "${formValidate.password}") {
                    id
                    permission
                    token
                    }
                  }
                `
            }).then(res => {
            console.log(res.data.login);
            AsyncStorage.setItem('id', res.data.login.id);
            AsyncStorage.setItem('permission', res.data.login.permission);
            AsyncStorage.setItem('token', res.data.login.token);
            return res
        })
            .then(res => {
                if (res) {
                    if (res.data.login.permission === 'admin') {
                        setTimeout(() => {
                            navigate('AdminStore')
                        }, 0)
                    } else if (res.data.login.permission === 'cook') {
                        setTimeout(() => {
                            navigate('Cook')
                        }, 0)
                    } else {
                        setTimeout(() => {
                            navigate('Waiter')
                        }, 0)
                    }
                } else {
                    setStateSubmitted(false);

                    Alert.alert('Error', 'Email or Password is incorrect');

                    setFormValidate(prevState => {
                        return {...prevState, ...{password: ''}}
                    });

                }
            })

    };

    /**
     * @desc Анимация для формы авторизации
     */

    const componentOpacityValue = new Animated.Value(0);
    const titleTranslateYValue = new Animated.Value(0);
    const buttonTranslateXValue = new Animated.Value(0);
    const inputTranslateXValue = new Animated.Value(0);
    const copyRightTranslateXValue = new Animated.Value(0);

    const imageOpacity = componentOpacityValue.interpolate({
        inputRange: [0, 0.25, 0.5, 0.75, 1],
        outputRange: [0, 0.25, 0.5, 0.75, 1]
    });

    const componentOpacityStyle = {
        opacity: imageOpacity
    };

    const titleMoveY = titleTranslateYValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 280]
    });

    const titleTransformStyle = {
        transform: [{translateY: titleMoveY}]
    };

    const buttonMoveX = buttonTranslateXValue.interpolate({
        inputRange: [0, 1],
        outputRange: [280, 0]
    });
    const buttonTransformStyle = {
        transform: [{translateX: buttonMoveX}]
    };

    const inputMoveX = inputTranslateXValue.interpolate({
        inputRange: [0, 1],
        outputRange: [280, 0]
    });
    const inputTransformStyle = {
        transform: [{translateX: inputMoveX}]
    };

    const copyRightMoveX = inputTranslateXValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 280]
    });
    const copyRightTransformStyle = {
        transform: [{translateX: copyRightMoveX}]
    };


    useEffect(() => {

        Animated.parallel([
            Animated.timing(componentOpacityValue, {
                toValue: 1,
                duration: 2000,
                easing: Easing.linear
            }),
            Animated.timing(titleTranslateYValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(buttonTranslateXValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
            Animated.timing(inputTranslateXValue, {
                toValue: 1,
                duration: 800,
                easing: Easing.linear
            }),
            Animated.timing(copyRightTranslateXValue, {
                toValue: 1,
                duration: 1000,
                easing: Easing.linear
            }),
        ]).start();
    }, []);

    const handleOpenGit = () => {
        Linking.openURL('https://github.com/F1-Final-Project');
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <ImageBackground source={require('../../img/bgc.jpg')} style={styles.projectBgc}>
                <Animated.View style={[styles.projectBgc, componentOpacityStyle]}>
                    <Animated.Text style={[styles.authText, styles.titleContainer, titleTransformStyle]}>Sign
                        in</Animated.Text>
                    <Animated.View style={[styles.inputContainerAnimation, inputTransformStyle]}>
                        <TextInput
                            label='Email'
                            style={styles.authTextField}
                            underlineColor={"#7a6c5b"}
                            onChangeText={handleEmailChange}
                            keyboardAppearance="dark"
                            keyboardType="email-address"
                            value={formValidate.email}
                        />
                        <TextInput
                            label='Password'
                            style={styles.authTextField}
                            onChangeText={handlePassChange}
                            underlineColor={"#7a6c5b"}
                            keyboardAppearance="dark"
                            secureTextEntry={true}
                            value={formValidate.password}
                        />
                    </Animated.View>
                    <Animated.View style={[styles.btnContainerAnimation, buttonTransformStyle]}>
                        <TouchableHighlight style={styles.authBtn}
                                            underlayColor={"rgba(233, 194, 148, 1)"}
                                            onPress={onSubmit}
                                            onHideUnderlay={colorHideUnderlay}
                                            onShowUnderlay={colorShowUnderlay}
                        >
                            <Text style={{color: btnTextColor}}>{submitted ? 'Loading...' : 'Submit'}</Text>
                        </TouchableHighlight>
                    </Animated.View>
                    <Animated.Text style={[styles.copyRight, copyRightTransformStyle]}>Copyright &copy; <Text
                        style={styles.copyRightLink}
                        onPress={handleOpenGit}>Git
                        Repositories</Text> {new Date().getFullYear()}</Animated.Text>
                </Animated.View>
            </ImageBackground>
        </ScrollView>
    )
}

AuthScreen.navigationOptions = {
    header: null,
};


