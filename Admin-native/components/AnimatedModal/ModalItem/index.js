import React, {useContext} from 'react'
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
import uuid from 'uuid'
import {Context} from '../../../context/appContext'

export default function ModalItem() {

    const {dispatch, state} = useContext(Context);

    /**
     * @desc Функция для отображения вывода зависящих от типа данных разных элементов
     * (String n Number - input)
     * (Array - TransferList для выбора элементов и добавление в основной список)
     * (Object - select для выбора одного элемента)
     */

    const handleInputItems = () => {
        return Object.keys(state.product).map((key, index) => {

            let itemValue = state.product[key];

            if (key !== '_id'
                && key !== '__v'
                && key !== undefined
                && typeof itemValue !== 'object'
                && key !== 'additionalIngredients'
                || itemValue === null) {
                return <TextInput
                    label='Email'
                    style={styles.authTextField}
                    underlineColor={"#7a6c5b"}
                    // onChangeText={handleEmailChange}
                    keyboardAppearance="dark"
                    keyboardType="email-address"
                    //value={formValidate.email}
                    key={uuid()}
                />

            } else if (key !== '_id'
                && key !== '__v'
                && key !== undefined
                && typeof itemValue === 'object'
                && key !== 'additionalIngredients'
                && itemValue !== null) {
                return Array.isArray(itemValue) ? (
                        <Text key={uuid()}>Array</Text>
                    )
                    : (<Text key={uuid()}>Select</Text>
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


