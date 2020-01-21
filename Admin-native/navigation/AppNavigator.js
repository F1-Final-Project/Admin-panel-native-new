import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingStack from './AuthLoadingNavigator'
import MenuStack from "./MenuNavigator";
import WaiterStack from "./WaiterNavigator";
import AuthStack from './AuthNavigation'
import AdminStack from './AdminNavigation'


export default createAppContainer(
    createSwitchNavigator({

            AuthLoading: AuthLoadingStack,
            Auth: AuthStack,
            Main: MainTabNavigator,
            Waiter: WaiterStack,
            Menu: MenuStack,
            AdminStore: AdminStack


        },
        {
            initialRouteName: 'AuthLoading',
        })
);
