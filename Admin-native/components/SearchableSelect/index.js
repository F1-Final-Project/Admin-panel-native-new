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


    return (
        <Fragment>
            <SearchableDropdown
                multi={true}
                selectedItems={selectedItems}
                onItemSelect={item => {
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


                }}
                containerStyle={{padding: 5}}
                onRemoveItem={(item, index) => {
                    const items = selectedItems.filter(sitem => sitem.id !== item.id);
                    setSelectedItems(items)

                    const updatedIngredient = Object.assign(state.product, {[newItemProduct]: items});

                    dispatch({
                        ...{
                            type: 'onChangeInput',
                            payload: updatedIngredient,
                            saveOrClose: true,
                        },
                    });
                }}
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

