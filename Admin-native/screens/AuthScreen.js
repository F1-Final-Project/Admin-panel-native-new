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


import {
    Animated,
    Easing
} from "react-native";

import ApolloClient, {gql, } from 'apollo-boost';

const client = new ApolloClient({
    uri: 'https://f1-graphql-server.herokuapp.com/graphql',
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

    const handleEmailChange = e => {
        setFormValidate(prevState => {
            return {...prevState, ...{email: e}}
        });
    };

    const handlePassChange = e => {
        setFormValidate(prevState => {
            return {...prevState, ...{password: e}}
        });

    };

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
            AsyncStorage.setItem('id', res.data.login.id);
            AsyncStorage.setItem('permission', res.data.login.permission);
            AsyncStorage.setItem('token', res.data.login.token);
            return res
        })
            .then(res => {
                if (res) {
                    if (res.data.login.permission === 'admin') {
                        setTimeout(() => {
                            navigate('Main')
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
            <ImageBackground source={require('../img/bgc.jpg')} style={styles.projectBgc}>
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
