import React, {useReducer} from 'react'
import {
    ImageBackground,
    SafeAreaView,
    Text,
} from "react-native";
import {styles} from './style';

import {useQuery, useMutation} from "@apollo/react-hooks";
import {Context} from '../../context/appContext'
import reducer from '../../Reducer'
import {initState} from '../../Reducer/initStateDish'
import Store from '../../components/Store'
import Loading from "../../components/Loading";
import Header from "../../components/Menu/Header";
import {GET_ALL_DISH, UPDATE_DISHES, DELETE_DISH} from './queries'

export default function DishStoreScreen({navigation}) {

    const [state, dispatch] = useReducer(reducer, initState);

    const {loading, error, data, refetch} = useQuery(GET_ALL_DISH);
    const [updateDish] = useMutation(UPDATE_DISHES);
    const [deleteDish] = useMutation(DELETE_DISH);

    /**
     * @desc Функция для обновления блюд graphql mutation updateDish
     */

    const updateItems = () => {
        const {
            title,
            description,
            img,
            category,
            ingredients,
            price,
            weight
        } = state.product;

        const ingredientsId = ingredients.map(i => i.id);

        updateDish({
            variables: {
                id: state.itemId,
                title: title,
                description: description,
                img: img,
                category: category.id,
                ingredients: ingredientsId,
                additionalIngredients: ingredientsId,
                price: Number(price),
                weight: Number(weight),
            }
        })
    };

    /**
     * @desc Функция для удаления блюд graphql mutation deleteDish
     * @param id
     */

    const deleteItem = id => {
        deleteDish({variables: {id: id}});
        refetch()
    };

    return (
        <Context.Provider value={{
            dispatch, state
        }}><ImageBackground source={require('../../img/bgc.jpg')} style={styles.projectBgc}>
            {loading || error ? <Loading/> : (
                <SafeAreaView style={styles.mainContainer}>
                    <Header navigation={navigation}/>
                    <Text style={styles.mainPhrase}>
                        Editing meals
                    </Text>
                    <Store data={data}
                           updateItems={updateItems}
                           deleteItem={deleteItem}
                           dataAllProducts={data.dishAll ? data.dishAll : ''}
                    />
                </SafeAreaView>)}
        </ImageBackground>
        </Context.Provider>
    )
}




