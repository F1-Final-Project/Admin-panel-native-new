import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthLoadingStack from './AuthLoadingNavigator'
import AuthStack from './AuthNavigation'

export default createAppContainer(
    createSwitchNavigator({

            AuthLoading: AuthLoadingStack,
            Auth: AuthStack,
            Main: MainTabNavigator,

        },
        {
            initialRouteName: 'AuthLoading',
        })
);
