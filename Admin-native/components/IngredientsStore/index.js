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
import {GET_ALL_DISH, UPDATE_INGREDIENT, DELETE_INGREDIENT} from './queries'


export default function IngredientStoreScreen({navigation}) {

    const [state, dispatch] = useReducer(reducer, initState);

    const {loading, error, data, refetch} = useQuery(GET_ALL_DISH);

    const [updateIndgredient] = useMutation(UPDATE_INGREDIENT);
    const [deleteIndgredient] = useMutation(DELETE_INGREDIENT);

    /**
     * @desc Функция для обновления ингредиентов graphql mutation updateIngredient
     */

    const updateItems = () => {
        const {
            title,
            description,
            price,
            restInStock
        } = state.product;

        updateIndgredient({
            variables: {
                id: state.itemId,
                title: title,
                restInStock: restInStock,
                description: description,
                price: Number(price),
            }
        })
    };

    /**
     * @desc Функция для удаления ингредиентов graphql mutation deleteIngredient
     * @param id
     */

    const deleteItem = id => {
        deleteIndgredient({variables: {id: id}});
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
                        Editing ingredients
                    </Text>
                    <Store data={data}
                           updateItems={updateItems}
                           deleteItem={deleteItem}
                           dataAllProducts={data.ingredientAll ? data.ingredientAll :''}/>
                </SafeAreaView>)}
        </ImageBackground>
        </Context.Provider>
    )
}




