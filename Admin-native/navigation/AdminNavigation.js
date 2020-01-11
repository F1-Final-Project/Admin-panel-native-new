import React from 'react'
import DishScreen from "../screens/DishStoreScreen";
import IngredientsScreen from "../screens/IngredientsStoreScreen";
import OrderIngredients from '../screens/OrderIngredientsScreen'
import MenuScreen from '../screens/MenuScreen'
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';


const DrawerNavigator = createDrawerNavigator({
    IngredientsStore: {
        screen :IngredientsScreen,
    } ,
    DishStore: {
        screen: DishScreen
    },
    OrderIngredientsStore: {
        screen: OrderIngredients
    },
    Menu: {
        screen: MenuScreen
    }
},{
    drawerBackgroundColor: '#212121',
    contentOptions: {
        activeTintColor: '#000',
        activeBackgroundColor: '#E9C294',
        inactiveTintColor: '#d0cdc7'

}
});

const DrawerNavigatorStore = createAppContainer(DrawerNavigator);

export default DrawerNavigatorStore
