import Overlay from 'react-native-modal-overlay';
import {AsyncStorage, Dimensions, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";


export default ({modalOpen, onCloseModal, orders, tables, setActiveOrder}) => {

    return(
        <Overlay visible={modalOpen}
                 onClose={onCloseModal}
                 closeOnTouchOutside
                 animationType="zoomIn"
                 containerStyle={{backgroundColor: 'rgba(21, 21, 21, 0.75)', flex: 1, justifyContent: 'center', flexDirection: 'row',}}
                 childrenWrapperStyle={{width: 220, backgroundColor: '#212121', marginTop: 80, borderWidth: 0.5, borderRadius: 5, borderColor: '#82796d', height: 300}}
                 animationDuration={500}>
            <View >
                {tables.map((item)=>{
                    return(
                        <View key={item}>
                            {(orders.find((order) => order.table === item)) ?
                                (<TouchableOpacity key={item} onPress={() => {setActiveOrder(orders.find(order => order.table === item)); onCloseModal()}}>
                                        <Text style={{color: '#E9C294', marginBottom: 15}}>make active order table # {item}</Text>
                                    </TouchableOpacity>
                                ) :
                                null}
                        </View>
                    )}
                )}
            </View>
        </Overlay>
    )
}
