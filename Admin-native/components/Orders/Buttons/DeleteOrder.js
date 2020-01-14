import React, { Fragment, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from "react-native";

import {styles} from "./style";

export default ({deleteOrder}) => {

    return(
        <View style={styles.deleteOrder}>
            <TouchableOpacity
                onPress={deleteOrder}
            >
                <Text style={styles.buttonText}>Delete Order</Text>
            </TouchableOpacity>
        </View>
    )
}