import Overlay from 'react-native-modal-overlay';
import {AsyncStorage, Dimensions, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import { ADD_ORDER } from '../../graphql/order';
import {useMutation} from '@apollo/react-hooks';

export default ({modalOpen, onCloseModal, orders, updateData, tables}) => {

    const [staff, setStaff]= useState('');

    AsyncStorage.getItem('id').then(id=>setStaff(id));

    const [addOrder, { data }] = useMutation(ADD_ORDER);

    const createOrder=(num)=>{
        if (staff) {
            addOrder({variables: {staff: staff, table: num}});
            updateData();
        }
    };

    return(
        <View>
            {orders?
                (<Overlay visible={modalOpen}
                 onClose={onCloseModal}
                 closeOnTouchOutside
                 animationType="zoomIn"
                 containerStyle={{backgroundColor: 'rgba(21, 21, 21, 0.75)', flex: 1, justifyContent: 'center', flexDirection: 'row',}}
                 childrenWrapperStyle={{width: 180, backgroundColor: '#212121', marginTop: 80, borderWidth: 0.5, borderRadius: 5, borderColor: '#82796d', height: 300}}
                 animationDuration={500}>
            <View >
            {tables.map((item)=>{
                return(
                    <View key={item}>
                        {(orders.find((order) => order.table === item)) ?
                            (<View >
                                    <Text style={{color: '#82796d', marginBottom: 15}}>table # {item}</Text>
                                </View>
                            ) :
                            (<TouchableOpacity key={item} onPress={() => {createOrder(item); onCloseModal()}}>
                                <View >
                                    <Text style={{color: '#E9C294', marginBottom: 15}}>table # {item}</Text>
                                </View>
                            </TouchableOpacity>)}
                    </View>
                )}
            )}
        </View>
        </Overlay>): null}
        </View>
    )
}
