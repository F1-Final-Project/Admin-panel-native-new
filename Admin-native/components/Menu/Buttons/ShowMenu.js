import React from 'react';
import {Text, View, TouchableOpacity} from "react-native";

import {styles} from "./style";

export default ({content, setContent}) => {

    return(
        <View style={styles.showMenu}>
            <TouchableOpacity
                onPress={()=> {content==='tables'?setContent('dishes'):setContent('tables')}}
            >
                <Text style={styles.buttonText}>{content==='tables'?'DISHES':'TABLES'}</Text>
            </TouchableOpacity>
        </View>
    )
}