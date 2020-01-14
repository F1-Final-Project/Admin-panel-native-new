import React, { Fragment, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from "react-native";

import {styles} from "./style";

export default ({setModalPaymentMethod}) => {

    return(
        <View style={styles.createInvoice}>
            <TouchableOpacity
                onPress={()=>setModalPaymentMethod(true)}
            >
                <Text style={styles.buttonText}>Create Invoice</Text>
            </TouchableOpacity>
        </View>
    )
}