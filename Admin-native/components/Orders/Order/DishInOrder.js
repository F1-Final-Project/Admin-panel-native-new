import React, {useState, useEffect} from 'react'
import {
    AsyncStorage,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { CheckBox } from 'react-native-elements'
import DeleteDishButton from "../Buttons/DeleteDishInOrder";
import UpdateDishButton from "../Buttons/UpdateDishInOrder";
import updateDishInOrder from "../../../services/order/updateDishInOrder";
import {UPDATE_ORDER} from '../../../graphql/order';
import {useMutation} from '@apollo/react-hooks';

export default function DishPage({dish, deleteItemInOrder, order, updateCurrentOrder}) {

    const [updateOrder] = useMutation(UPDATE_ORDER);
    const [staff, setStaff]= useState('');
    AsyncStorage.getItem('id').then(id=>setStaff(id));

    const [showIngredients, setShowIngredients]=useState(false);
    const [ingredients, setIngredients]=useState(dish.ingredients);
    const [additionalIngredients, setAdditionalIngredients]=useState(dish.additionalIngredients);

    const addIngredient=(ingredient)=>{
        const newIngredients= ingredients; newIngredients.push(ingredient); setIngredients(newIngredients);
        const newAdditionalIngredients= additionalIngredients.filter((item)=>item._id!==ingredient._id); setAdditionalIngredients(newAdditionalIngredients)
    };
    const removeIngredient=(ingredient)=>{
        const newAdditionalIngredients= additionalIngredients; newAdditionalIngredients.push(ingredient); setAdditionalIngredients(newAdditionalIngredients);
        const newIngredients= ingredients.filter((item)=>item._id!==ingredient._id); setIngredients(newIngredients);
    };

    const updateDish=()=>{
        updateDishInOrder(staff, ingredients, additionalIngredients, order, dish, updateOrder, updateCurrentOrder);
        setShowIngredients(false)
    };

    return(
        <View>
            {order.onKitchen&&!order.completed?
                (<View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 15}}>
                <TouchableOpacity style={{flexDirection: 'row', height: 35}} onPress={() => {
                    setShowIngredients(!showIngredients);
                }}>
                    <Text style={{color: '#82796d', fontSize: 20, marginLeft: 10}}>{dish.title}</Text>
                    <Text style={{color: '#82796d', fontSize: 20, marginLeft: 10}}>{dish.price} $</Text>
                </TouchableOpacity>
                <DeleteDishButton deleteItemInOrder={deleteItemInOrder} item={dish}/>
                </View>
                <View style={{flexDirection: 'row'}}>
                    <View>
                {showIngredients&&ingredients ? (ingredients).map((item, index)=>{
                    return(
                            <CheckBox
                                key={item._id+index.toString()}
                                title={item.title}
                                checkedColor={'#82796d'}
                                checked={true}
                                onPress={()=>{removeIngredient(item)}}
                                containerStyle={styles.container}
                                textStyle={styles.text}
                                size={14}
                            />
                    )}): null}
                    </View>
                    <View>
                        {showIngredients&&additionalIngredients ? (additionalIngredients).map((item, index)=>{
                            return(
                                <CheckBox
                                    key={item._id+index.toString()}
                                    title={item.title}
                                    checkedColor={'#82796d'}
                                    uncheckedColor={'#82796d'}
                                    onPress={()=>{addIngredient(item)}}
                                    containerStyle={styles.container}
                                    textStyle={styles.text}
                                    size={14}
                                />
                            )}): null}
                        </View>
                </View>
                    {showIngredients?
                        (<UpdateDishButton updateDish={updateDish}/>):
                        null}
                    </View>): (
                    <View style={{flexDirection: 'row', paddingTop: 15}}>
                        <Text style={{color: '#82796d', fontSize: 20, marginLeft: 10}}>{dish.title}</Text>
                        <Text style={{color: '#82796d', fontSize: 20, marginLeft: 10}}>{dish.price} $</Text>
                    </View>
                )}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
        padding: 0,
        margin: 0,
        borderWidth:0,
        borderRadius:0,
    },
    text: {
        color: '#82796d',
        fontWeight: '300',
    },
});
