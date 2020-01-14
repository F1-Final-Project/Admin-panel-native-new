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
import TableItem from './table';

export default function OrderPage({tables, updateData, orders, setOrders, setModalVisible, setOpenOrder, setActiveOrder}) {

useEffect(()=>{
    updateData();
}, [])

return(
<ScrollView>
{orders?(
                <View style={styles.container}>
                    {tables.map((item)=>{
                        return(
                            <TableItem key={item} table={item} orders={orders} updateData={updateData} setModalVisible={setModalVisible} setActiveOrder={setActiveOrder} setOpenOrder={setOpenOrder}/>
                        )
                        }
                    )}
                </View>): null}
            </ScrollView>
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
