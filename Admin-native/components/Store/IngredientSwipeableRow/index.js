import React, {useEffect} from 'react'
import {useLazyQuery} from "@apollo/react-hooks";
import AppleStyleSwipeableRow from "../../SwipeableRow";
import StoreItem from "../StoreItem";
import {GET_INGREDIENT_BY_ID} from './queries'

export default function IngredientsSwipeableRow(props) {

    const {item, ModalVisible, deleteItem} = props;

    const [getIngredient, {loading, data}] = useLazyQuery(GET_INGREDIENT_BY_ID);


    useEffect(() => {
        getIngredient({
            variables: {id: item.id}
        });
    }, [getIngredient, data]);

    const Row = () => {
        return (
            <StoreItem item={item}/>
        )
    };
    const SwipeableRow = () => {
        return (
            <AppleStyleSwipeableRow ModalVisible={ModalVisible} data={data ? data.ingredient : ''} item={item} deleteItem={deleteItem}>
                <Row item={item} nameSection={'Categories'}/>
            </AppleStyleSwipeableRow>
        );

    };

    return (
        <SwipeableRow/>
    )
}


