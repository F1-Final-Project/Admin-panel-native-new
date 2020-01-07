import React, {useContext, useCallback} from 'react'
import {
    Text,
    TouchableHighlight,
    Alert,
    ScrollView,
    StyleSheet,
    Dimensions, ImageBackground,
    View,
    PanResponder, Animated,
} from "react-native";
import {TextInput} from "react-native-paper";
import {Context} from '../../../context/appContext'

export default function ModalItem() {

    const {dispatch, state} = useContext(Context);


    const handleInputChange = (name, e) => {
        const updatedIngredient = Object.assign(state.product, {[name]: e});
        dispatch({
            ...{
                type: 'onChangeInput',
                payload: updatedIngredient,
            },
        })
    };

    /**
     * @desc Функция для отображения вывода зависящих от типа данных разных элементов
     * (String n Number - input)
     * (Array - TransferList для выбора элементов и добавление в основной список)
     * (Object - select для выбора одного элемента)
     */

    const handleInputItems = () => {
        return Object.keys(state.product).map((itemProduct, index) => {

            let itemValue = state.product[itemProduct];

            if (itemProduct !== '_id'
                && itemProduct !== '__v'
                && itemProduct !== undefined
                && typeof itemValue !== 'object'
                && itemProduct !== '__typename'
                || itemValue === null) {
                return <TextInput
                    label={itemProduct.toUpperCase()}
                    style={styles.authTextField}
                    underlineColor={"#7a6c5b"}
                    onChangeText={e => handleInputChange(itemProduct, e)}
                    keyboardAppearance="dark"
                    keyboardType='default'
                    value={itemValue === null ? 0 : itemValue.toString()}
                    key={index}
                    multiline={true}
                />

            } else if (itemProduct !== '_id'
                && itemProduct !== '__v'
                && itemProduct !== undefined
                && typeof itemValue === 'object'
                && itemValue !== null) {
                return Array.isArray(itemValue) ? (
                        <Text key={index}>Array</Text>
                    )
                    : (<Text key={index}>Select</Text>
                    )
            }
        })
    };

    return (<View>
            {handleInputItems()}
            <Text>Modal Input</Text>
        </View>

    )
}

const styles = StyleSheet.create({
    authTextField: {
        width: "80%",
        padding: 7,
        backgroundColor: 'rgba(233, 194, 148, 0)'
    },
});


