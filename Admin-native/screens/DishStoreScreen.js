import React from 'react';
import Dish from '../components/DishStore';

export default function DishScreen({navigation}) {
    return <Dish navigation={navigation}/>
}

DishScreen.navigationOptions = {
    header: null,
};
