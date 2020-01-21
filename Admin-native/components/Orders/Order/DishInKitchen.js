import React, {useState, useEffect} from 'react'
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function DishInKitchen({dish}) {

    return(

                    <View style={{flexDirection: 'row', paddingTop: 15}}>
                        <Text style={{color: '#82796d', fontSize: 20, marginLeft: 10}}>{dish.title}</Text>
                        <Text style={{color: '#82796d', fontSize: 20, marginLeft: 10}}>{dish.price} $</Text>
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
