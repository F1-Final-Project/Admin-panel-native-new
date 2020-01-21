import React, {useEffect, useState} from 'react'
import {
    ScrollView,
    StyleSheet,
    View
} from 'react-native';
import TableItem from './table';

export default function OrderPage({tables, updateData, orders, setModalVisible, setOpenOrder, setActiveOrder}) {

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
});
