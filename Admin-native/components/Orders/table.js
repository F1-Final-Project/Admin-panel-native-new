import React, {useEffect, useState} from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ImageBackground,
    TouchableHighlight,
    SafeAreaView, Dimensions, AsyncStorage
} from 'react-native';
import { ADD_ORDER } from '../../graphql/order';
import {useMutation, useQuery} from '@apollo/react-hooks';

export default function Table({orders, updateData, setModalVisible, setOpenOrder, setActiveOrder, table}) {

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
        <View key={table}>
            {orders?
                (<View>
            {(orders.find((order) => order.table === table)) ?
                (<TouchableOpacity key={table} onPress={() => {
                    setModalVisible(true);
                    setOpenOrder(orders.find((order) => order.table === table));
                    setActiveOrder(orders.find((order) => order.table === table));
                }}>
                    <View style={styles.tables}>
                        <Text style={styles.taken}>table # {table}</Text>
                        <Text style={styles.taken}>taken</Text>
                    </View>
                </TouchableOpacity>) :
                (<TouchableOpacity key={table} onPress={() => {
                    createOrder(table);
                }}>
                    <View style={styles.tables}>
                        <Text style={styles.empty}>table # {table}</Text>
                        <Text style={styles.empty}>empty</Text>
                    </View>
                </TouchableOpacity>)}
            </View>): null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 10,
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tables: {
        margin      : 20,
        padding        : 35,
        width          : 120,
        height         : 120,
        borderRadius   : 5,
        shadowRadius: 8,
        borderWidth: 0.5,
        borderColor:'#82796d',
    },
    empty: {
        textAlign: 'center',
        color: '#E9C294',
    },
    taken: {
        textAlign: 'center',
        color: '#82796d',
    },
});
