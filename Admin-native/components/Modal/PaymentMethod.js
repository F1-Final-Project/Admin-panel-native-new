import Overlay from 'react-native-modal-overlay';
import {Text, View, TouchableOpacity} from "react-native";
import React from "react";

export default ({modalOpen, onCloseModal, createInvoice}) => {

    return(
        <Overlay visible={modalOpen}
                 onClose={onCloseModal}
                 closeOnTouchOutside
                 animationType="zoomIn"
                 containerStyle={{backgroundColor: 'rgba(21, 21, 21, 0.75)', flex: 1, justifyContent: 'center', flexDirection: 'row',}}
                 childrenWrapperStyle={{width: 220, backgroundColor: '#212121', marginTop: 180, borderWidth: 0.5, borderRadius: 5, borderColor: '#82796d', height: 110}}
                 animationDuration={500}>
            <Text style={{color: '#82796d', fontWeight: '300'}}>Choose payment method </Text>
            <View style={{flex: 1, flexDirection: 'row', marginTop: 30, marginLeft: 20, marginRight: 20}}>
                <TouchableOpacity style={{flex: 1}} onPress={() => {createInvoice('CASH'); onCloseModal()}}>
                    <Text style={{color: '#E9C294'}}>CASH</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {createInvoice('CARD'); onCloseModal()}}>
                    <Text style={{color: '#E9C294'}}>CARD</Text>
                </TouchableOpacity>
            </View>
        </Overlay>
    )
}
