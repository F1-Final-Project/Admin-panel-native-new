import React, {useState, useContext, useEffect,} from 'react'
import {
    StyleSheet,
    View,
} from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import AnimatedModal from '../../components/AnimatedModal'
import ModalItem from '../../components/AnimatedModal/ModalItem'
import DishSwipeableRow from './DishSwipeableRow'
import IngredientsSwipeableRow from './IngredientSwipeableRow'
import {Context} from "../../context/appContext";
import {styles} from './style';

export default function Dishes(props) {

    const {
        data,
        updateItems,
        deleteItem,
        dataAllProducts
    } = props;

    const {dispatch, state} = useContext(Context);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [allItemsStore, setAllItemsStore] = useState([]);

    useEffect(() => {
        if (dataAllProducts) {
            setAllItemsStore(dataAllProducts);
        }
    }, [data]);

    /**
     * @desc Функция для закрытия модального
     * @desc useReducer - dispatch обнуления состояния state.product
     */

    const handleCloseModal = () => {
        setIsModalVisible(false);

        if (state.saveOrClose === true) {
            updateItems()
        }

        dispatch({
            type: 'editItem',
            payload: '',
            saveOrClose: false
        });

    };

    return (
        <View style={{height: '90%'}}>
            <FlatList
                data={allItemsStore === undefined ? [] : allItemsStore}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                renderItem={({item, index}) => {
                    return (
                        data && data.dishAll ? (
                            <DishSwipeableRow item={item}
                                              index={index}
                                              ModalVisible={setIsModalVisible}
                                              data={data}
                                              deleteItem={deleteItem}/>
                        ) : (
                            <IngredientsSwipeableRow item={item}
                                                     index={index}
                                                     ModalVisible={setIsModalVisible}
                                                     data={data}
                                                     deleteItem={deleteItem}/>

                        )
                    )
                }}
                keyExtractor={(item, index) => `message ${index}`}
            />
            <AnimatedModal
                title={"Edit"}
                visible={isModalVisible}
                onClose={() => handleCloseModal()}
            ><ModalItem data={data}/></AnimatedModal>
        </View>

    )
}


