import React, {Fragment, useEffect} from 'react'
import {useLazyQuery} from "@apollo/react-hooks";
import AppleStyleSwipeableRow from "../../SwipeableRow";
import DishItem from "../DishItem";
import gql from "graphql-tag";

const GET_DISH_BY_ID = gql`
                    query getDishById($id: ID!){
                      dish(id: $id){
                        title
                      description
                      img
                      category {
                        id
                        title
                      }
                      ingredients {
                        id
                        title
                      }
                      price
                      weight
                      }
                    }
                `;

export default function DishSwipeableRow(props) {

    const {item, ModalVisible, deleteItem} = props;

    const [getDish, {loading, data}] = useLazyQuery(GET_DISH_BY_ID);

    useEffect(() => {
        getDish({
            variables: {id: item.id}
        });
    }, [getDish, data]);


    const Row = () => {
        return (
            <DishItem item={item}/>
        )
    };
    const SwipeableRow = () => {
        return (
            <AppleStyleSwipeableRow ModalVisible={ModalVisible} data={data} item={item} deleteItem={deleteItem}>
                <Row item={item} nameSection={'Categories'}/>
            </AppleStyleSwipeableRow>
        );

    };

    return (
        <SwipeableRow/>
    )
}


