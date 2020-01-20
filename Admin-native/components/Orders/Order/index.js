import React, { useState } from 'react';
import {StyleSheet, Text, View, ImageBackground, ScrollView} from 'react-native';
import Overlay from 'react-native-modal-overlay';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {DELETE_ORDER, ORDER_BY_ID, UPDATE_ORDER} from '../../../graphql/order';
import {ADD_INVOICE} from '../../../graphql/invoice';
import DeleteOrderButton from '../Buttons/DeleteOrder';
import deleteDishInOrder from '../../../services/order/deleteDishInOrder';
import ToKitchenOrderButton from '../Buttons/ToKitchenOrder';
import toKitchenOrder from '../../../services/order/toKitchenOrder';
import DishInOrder from './DishInOrder';
import CreateInvoiceButton from '../Buttons/CreateInvoice';
import createInvoiceFromOrder from '../../../services/invoice/createInvoice';
import PaymentMethodModal from "../../Modal/PaymentMethod";

export default ({order, modalVisible, setModalVisible, setShowOrder, updateData})=>{
    const id=order.id;

    const { loading, error, data, refetch } = useQuery( ORDER_BY_ID, {
        variables: { id },
    });

    const updateCurrentOrder=()=>{
        try{
            refetch();
        }
        catch (error) {
            console.log('ERROR gql-refetch in Order', error)
        }
    };

    const [deleteOrder] = useMutation(DELETE_ORDER);
    const [updateOrder] = useMutation(UPDATE_ORDER);
    const [addInvoice]=useMutation(ADD_INVOICE);

    const [modalPaymentMethod, setModalPaymentMethod] = useState(false);

    const closeModalPaymentMethod=()=>{
        setModalPaymentMethod(false)
    };

    const handlePress=()=>{
            setModalVisible(false);
            setShowOrder('');
        };

    const deleteOrderById=()=>{
        deleteOrder({variables: {id: id}}).then((res)=> updateData());
        handlePress();
    };

    const deleteItemInOrder=(dish)=>{
        deleteDishInOrder(dish, data, updateCurrentOrder, updateOrder)
    };

    const toKitchen=()=>{
        toKitchenOrder(data, updateOrder);
        handlePress();
    };

    const createInvoice=(method)=>{
        createInvoiceFromOrder(data, addInvoice, deleteOrderById, method);
    };

        return (
            <View>
            {data?
                    (<Overlay visible={modalVisible}
                     onClose={handlePress}
                     closeOnTouchOutside
                     animationType="zoomIn"
                     borderRadius={0}
                     containerStyle={{backgroundColor: 'rgba(21, 21, 21, 0.75)'}}
                     childrenWrapperStyle={{backgroundColor: '#212121', marginRight: 30, marginLeft: 30,padding: 0, borderWidth: 0.5, borderRadius: 5, borderColor: '#82796d'}}
                     animationDuration={500}>
                        <ScrollView style={{width: '100%'}}>
                            <ImageBackground source={require('../../../img/bgc.jpg')} style={styles.wrap}>
                                    <View style={{height: 'auto', paddingTop: 20, paddingBottom: 20, paddingLeft: 35, paddingRight:35}}>
                                    <View>
                                        <Text style={{color: '#82796d', height: 35}}>
                                            Status: {!data.order.onKitchen&&!data.order.comleted? ' new order': data.order.completed? ' completed': ' onKitchen'}
                                        </Text>
                                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{color: '#E9C294'}}>
                                            table# {data.order.table}
                                        </Text>
                                        <Text style={{color: '#82796d'}}>
                                            staff {data.order.staff? data.order.staff.lastName: null}
                                        </Text>
                                        </View>
                                            {data.order.orderItems ? (data.order.orderItems).map((item,index)=>{
                                                return(
                                                    <DishInOrder order={data.order} updateCurrentOrder={updateCurrentOrder} key={index} dish={item} deleteItemInOrder={deleteItemInOrder}/>
                                                        )}): null}
                                        <Text style={{color: '#82796d', marginTop: 30}}>
                                            order price {data.order.orderPrice} $
                                        </Text>
                                     </View>
                                {!data.order.onKitchen&&!data.order.completed?
                                    (<View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                                        <ToKitchenOrderButton toKitchenOrder={toKitchen}/>
                                        <DeleteOrderButton deleteOrder={deleteOrderById}/>
                                    </View>): data.order.completed?
                                        (<CreateInvoiceButton setModalPaymentMethod={setModalPaymentMethod}/>): null
                                }
                                </View>
                            </ImageBackground>
                        </ScrollView>
            </Overlay>): null}
            <PaymentMethodModal modalOpen={modalPaymentMethod} onCloseModal={closeModalPaymentMethod} createInvoice={createInvoice} />
            </View>
    );
}
const styles = StyleSheet.create({
    wrap: {
        width: '100%',
        height: '100%',
        flex: 1,
        justifyContent: 'space-between',

    },
});