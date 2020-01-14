import React, { Fragment, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from "react-native";

import {styles} from "./style";

export default ({setModalOpen}) => {

    return(
        <View style={styles.changeOrder}>
            <TouchableOpacity
                onPress={()=> setModalOpen(true)}
            >
                <Text style={styles.buttonText}>Change Order</Text>
            </TouchableOpacity>
        </View>
    )
}