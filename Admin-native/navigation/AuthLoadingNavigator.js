import React from 'react'
import {createStackNavigator} from "react-navigation-stack";
import AuthLoadingScreen from "../screens/AuthLoadingScreen";
import {Platform} from "react-native";


const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const AuthLoadingStack = createStackNavigator(
    {
        AuthLoading: AuthLoadingScreen,
    },
    config
);

AuthLoadingScreen.navigationOptions = {
    header: null,
};

AuthLoadingStack.path = '';

export default AuthLoadingStack
