import React from 'react'
import {createStackNavigator} from "react-navigation-stack";
import {Platform} from "react-native";
import WaiterScreen from '../screens/WaiterScreen'

const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

export const WaiterStack = createStackNavigator(
    {
        Waiter: WaiterScreen,
    },
    config
);

WaiterStack.navigationOptions = {
    header: null,
};

WaiterStack.path = '';

export default WaiterStack