import React from 'react';
import {Text, View, TouchableOpacity} from "react-native";

import {styles} from "./style";

export default ({setModalOpen}) => {

    return(
        <View style={styles.createOrder}>
            <TouchableOpacity
                onPress={()=> setModalOpen(true)}
            >
                <Text style={styles.buttonText}>Create Order</Text>
            </TouchableOpacity>
        </View>
    )
}