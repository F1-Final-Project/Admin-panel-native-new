import React, {useEffect, useReducer} from 'react'
import {
    Text,
} from "react-native";

import {useQuery, useMutation} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import {Context} from '../context/appContext'
import reducer from '../Reducer'
import {initState} from '../Reducer/initStateDish'
import Dishes from '../components/Dish'


const GET_ALL_DISH = gql`{
  dishAll{
    id,
    title,
    description,
    category {
      id,
      title
    }
  },
  ingredientAll{
    id,
    title,
  },
  categoryAll{
  id,
  title,
  }
}
  `;

const UPDATE_DISHES = gql`
mutation updateDish(
  $id: ID!
  $title: String!,
  $description: String!,
  $img: String!,
  $category: ID!,
  $ingredients: [ID]!,
  $additionalIngredients: [ID]!,
  $price: Float!,
  $weight: Float!
) {

updateDish(
  id: $id
  title: $title,
  description: $description,
  img: $img,
  category: $category,
  ingredients: $ingredients,
  additionalIngredients: $additionalIngredients,
  price: $price,
  weight: $weight) {

  id,
  title,
  img,
  price,
  weight,
  description,
  category {
  id,
  title },
  },
}`;

const DELETE_DISH = gql`
mutation updateDish($id: ID){
deleteDish(id: $id) {
id
}
}`;




export default function IngredientsStoreScreen() {

    const [state, dispatch] = useReducer(reducer, initState);

    const {loading, error, data, refetch} = useQuery(GET_ALL_DISH);

    const [updateDish] = useMutation(UPDATE_DISHES);
    const [deleteDish] = useMutation(DELETE_DISH);


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

    console.log(typeof null);

    const deleteItem = id => {
        deleteDish({variables: {id: id}})
        refetch()
    };

    return (
        <Context.Provider value={{
            dispatch, state
        }}>
            {loading || error ? <Text>123</Text> : <Dishes data={data} updateItems={updateItems} deleteItem={deleteItem}/>}
        </Context.Provider>
    )
}


