import React from 'react'
import {createStackNavigator} from "react-navigation-stack";
import IngredientsScreen from "../screens/IngredientsStoreScreen";
import {Platform} from "react-native";


const config = Platform.select({
    web: {headerMode: 'screen'},
    default: {},
});

const IngredientsLoadingStack = createStackNavigator(
    {
        IngredientsStore: IngredientsScreen,
    },
    config
);

IngredientsScreen.navigationOptions = {
    header: null,
};

IngredientsLoadingStack.path = '';

export default IngredientsLoadingStack
