import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingStack from './AuthLoadingNavigator'
import AuthStack from './AuthNavigation';
import MenuStack from "./MenuNavigator";
import WaiterStack from "./WaiterNavigator";

export default createAppContainer(
    createSwitchNavigator({

            AuthLoading: AuthLoadingStack,
            Auth: AuthStack,
            Main: MainTabNavigator,
            // Menu: MenuStack,
            Waiter: WaiterStack,

        },
        {
            initialRouteName: 'AuthLoading',
        })
);
