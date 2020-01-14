import React, { Fragment, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from "react-native";

import {styles} from "./style";

export default ({deleteItemInOrder, item}) => {

    return(
        <View style={styles.deleteDish}>
            <TouchableOpacity
                onPress={()=>deleteItemInOrder(item)}
            >
                <Text style={styles.buttonText}>Delete Dish</Text>
            </TouchableOpacity>
        </View>
    )
}