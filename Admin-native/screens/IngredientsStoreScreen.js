import React from 'react';
import IngredientStore from '../components/IngredientsStore';

export default function IngredientStoreScreen({navigation}) {
    return <IngredientStore navigation={navigation}/>
}

IngredientStoreScreen.navigationOptions = {
    header: null,
};
