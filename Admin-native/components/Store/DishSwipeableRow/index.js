import React, { useEffect} from 'react'
import {useLazyQuery} from "@apollo/react-hooks";
import AppleStyleSwipeableRow from "../../SwipeableRow";
import StoreItem from "../StoreItem";
import {GET_DISH_BY_ID} from './queries'



export default function DishSwipeableRow(props) {

    const {item, ModalVisible, deleteItem} = props;

    const [getDish, {loading, data}] = useLazyQuery(GET_DISH_BY_ID);

    useEffect(() => {
        getDish({
            variables: {_id: item._id}
        });
    }, [getDish, data]);

    const Row = () => {
        return (
            <StoreItem item={item}/>
        )
    };
    const SwipeableRow = () => {
        return (
            <AppleStyleSwipeableRow ModalVisible={ModalVisible}
                                    data={data ? data.dish : ''}
                                    item={item}
                                    deleteItem={deleteItem}
                                    RenderMoreBtn={true}
            >
                <Row item={item} nameSection={'Categories'}/>
            </AppleStyleSwipeableRow>
        );

    };

    return (
        <SwipeableRow/>
    )
}


