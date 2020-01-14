import React, { Fragment, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from "react-native";

import {styles} from "./style";

export default ({toKitchenOrder}) => {

    return(
        <View style={styles.deleteOrder}>
            <TouchableOpacity
                onPress={toKitchenOrder}
            >
                <Text style={styles.buttonText}>To Kitchen</Text>
            </TouchableOpacity>
        </View>
    )
}