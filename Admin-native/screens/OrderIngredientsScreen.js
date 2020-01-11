import React from 'react';
import OrderIngredients from '../components/OrderIngredients';

export default function MenuScreen({navigation}) {
    return <OrderIngredients navigation={navigation}/>
}

MenuScreen.navigationOptions = {
    header: null,
};
