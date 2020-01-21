import React from 'react';
import {Text, View, TouchableOpacity} from "react-native";

import {styles} from "./style";

export default ({updateDish}) => {

    return(
        <View style={styles.updateDish}>
            <TouchableOpacity
                onPress={updateDish}
            >
                <Text style={styles.buttonText}>Update Dish</Text>
            </TouchableOpacity>
        </View>
    )
}