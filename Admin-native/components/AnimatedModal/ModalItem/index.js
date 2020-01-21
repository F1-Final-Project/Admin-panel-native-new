import React, {useContext, useState, useEffect} from 'react'
import {
    StyleSheet,
    View,
} from "react-native";

import {TextInput} from "react-native-paper";
import {Context} from '../../../context/appContext'
import SearchableSelect from '../../SearchableSelect'
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as sorted from "../../../lib/sorted";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import {styles} from './style';


export default function ModalItem(props) {

    const {dispatch, state} = useContext(Context);
    const {data} = props;

    const [categories, setCategories] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);



    useEffect(() => {

        if (data) {
            if(data.categoryAll){
                let reNameItems = sorted.changeObjectItems(data.categoryAll);
                setCategories(reNameItems);
                if (state.product.category) {
                    setSelectedItems(sorted.filterArrayItems([state.product.category], reNameItems));
                }
            }

        }

    }, [data, state.product]);


    /**
     * @desc Функция для состояния ингредиента
     * @desc useReducer - dispatch обновления состояния ингредиента
     * @param name - названия поля
     * @param e - вводные даннык
     */


    const handleInputChange = (name, e) => {
        const updatedIngredient = Object.assign(state.product, {[name]: e});

        dispatch({
            ...{
                type: 'onChangeInput',
                payload: updatedIngredient,
                saveOrClose: true,
            },
        })
    };


    /**
     * @desc Функция для отображения вывода зависящих от типа данных разных элементов
     * (String n Number - input)
     * (Array - SearchableDropdown multi = true для выбора элементов и добавление в основной список)
     * (Object - SearchableDropdown для выбора одного элемента)
     */

    const handleInputItems = () => {
        return Object.keys(state.product).map((itemProduct, index) => {

            let itemValue = state.product[itemProduct];
            if (itemProduct !== '_id'
                && itemProduct !== '__v'
                && itemProduct !== undefined
                && typeof itemValue !== 'object'
                && itemProduct !== '__typename'
                && state.nameSection === 1
                || itemValue === null) {
                return <TextInput
                    label={itemProduct.toUpperCase()}
                    style={styles.authTextField}
                    underlineColor={"#7a6c5b"}
                    onChangeText={e => handleInputChange(itemProduct, e)}
                    keyboardAppearance="dark"
                    keyboardType='default'
                    value={itemValue === null ? 0 : itemValue.toString()}
                    key={itemProduct}
                    multiline={true}
                />

            } else if (itemProduct !== '_1id'
                && itemProduct !== '__v'
                && itemProduct !== undefined
                && typeof itemValue === 'object'
                && state.nameSection === 2
                && itemValue !== null ) {
                return Array.isArray(itemValue) ? (<SearchableSelect key={index} itemProduct={data.ingredientAll} newItemProduct={itemProduct}/>)

                    : (<SearchableDropdown
                            key={index}
                            selectedItems={selectedItems}
                            onItemSelect={item => {
                                const newItems = selectedItems.map(i => i._id === item._id ? i : item);

                                setTimeout(() => {
                                    setSelectedItems(newItems);
                                }, 0);

                                const updatedIngredient = Object.assign(state.product, {[itemProduct]: newItems[0]});

                                dispatch({
                                    ...{
                                        type: 'onChangeInput',
                                        payload: updatedIngredient,
                                        saveOrClose: true,
                                    },
                                });

                            }}
                            containerStyle={{padding: 5}}
                            itemStyle={{
                                padding: 10,
                                marginTop: 2,
                                backgroundColor: '#3e3e3e',
                                borderColor: '#7a6c5b',
                                borderWidth: 1,
                                borderRadius: 5,
                            }}
                            itemTextStyle={{color: '#d0cdc7'}}
                            itemsContainerStyle={{maxHeight: 240, }}
                            items={categories}
                            chip={true}
                            resetValue={false}
                            textInputProps={
                                {
                                    placeholder: selectedItems.length > 0 ? selectedItems[0].name : '',
                                    underlineColorAndroid: "transparent",
                                    style: {
                                        padding: 12,
                                        borderWidth: 1,
                                        borderColor: '#7a6c5b',
                                        borderRadius: 5,
                                        color: '#d0cdc7'
                                    },
                                    onTextChange: text => alert(text)
                                }
                            }
                            placeholderTextColor='#d0cdc7'

                            listProps={
                                {
                                    nestedScrollEnabled: true,
                                }
                            }
                        />
                    )
            }
        })
    };

    return (
        <>
            {state.nameSection === 1 ? (
                    <KeyboardAwareScrollView>
                        {handleInputItems()}
                    </KeyboardAwareScrollView>)
                : (
                    <View>
                        {handleInputItems()}
                    </View>)}
        </>

    )
}


