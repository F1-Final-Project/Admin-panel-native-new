import React from 'react'
import {createStackNavigator} from "react-navigation-stack";
import {Platform} from "react-native";
import AuthScreen from '../screens/AuthScreen'


const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

export const AuthStack = createStackNavigator(
    {
        Auth: AuthScreen,
    },
    config
);

AuthStack.navigationOptions = {
    header: null,
};

AuthStack.path = '';


export default AuthStack
