import React, {Fragment, useContext, useEffect, useState} from 'react';
import SearchableDropdown from 'react-native-searchable-dropdown';
import {Context} from '../../context/appContext';
import * as sorted from '../../lib/sorted'

export default function SearchableSelect(props) {

    const {dispatch, state} = useContext(Context);

    const {itemProduct, newItemProduct} = props;

    const [newProduct, setNewProduct] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(() => {

        let reNameItems = sorted.changeObjectItems(itemProduct);

        setNewProduct(reNameItems);

        setSelectedItems(sorted.filterArrayItems(state.product.ingredients, reNameItems))
    }, []);

    console.log('----->', selectedItems);

    /**
     * @desc Функция для выборки из списка ингредиентов чекбоксов
     * @desc useReducer - dispatch обновления состояния списка ингредиенто
     * @param item - елемент object
     */

    const handleItemSelect = item => {
        const newItems = [...selectedItems, ...[item]];



        setTimeout(() => {
            setSelectedItems(newItems);
        }, 0);

        const updatedIngredient = Object.assign(state.product, {[newItemProduct]: newItems});

        dispatch({
            ...{
                type: 'onChangeInput',
                payload: updatedIngredient,
                saveOrClose: true,
            },
        });
    };

    /**
     * @desc Функция для удаления из списка ингредиентов чекбоксов
     * @desc useReducer - dispatch обновления состояния списка ингредиенто
     * @param item - елемент object
     * @param index
     */

    const handleRemoveItemListCheked = (item, index) => {
        const items = selectedItems.filter(sitem => sitem._id !== item._id);
        setSelectedItems(items);

        const updatedIngredient = Object.assign(state.product, {[newItemProduct]: items});

        dispatch({
            ...{
                type: 'onChangeInput',
                payload: updatedIngredient,
                saveOrClose: true,
            },
        });

    };

    return (
        <Fragment>
            <SearchableDropdown
                multi={true}
                selectedItems={selectedItems}
                onItemSelect={item => handleItemSelect(item)}
                containerStyle={{padding: 5}}
                onRemoveItem={(item, index) =>handleRemoveItemListCheked(item, index)}
                itemStyle={{
                    padding: 10,
                    marginTop: 2,
                    backgroundColor: '#3e3e3e',
                    borderColor: '#7a6c5b',
                    borderWidth: 1,
                    borderRadius: 5,
                }}
                itemTextStyle={{color: '#d0cdc7'}}
                itemsContainerStyle={{maxHeight: 240}}
                items={newProduct}
                chip={true}
                resetValue={false}
                textInputProps={
                    {
                        placeholder: "Enter ingredients",
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
        </Fragment>
    );
}

