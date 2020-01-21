import React, {useEffect, useState} from 'react'
import {
    AsyncStorage,
    ImageBackground,
    SafeAreaView,
    Text
} from 'react-native'
import ModalOrder from '../../components/Orders/Order'
import Header from '../../components/Menu/Header/index'
import { GET_ALL_ORDER } from '../../graphql/order'
import {useQuery} from '@apollo/react-hooks'
import OrdersPage from '../../components/Orders'
import MenuPage from '../../components/Menu'
import {styles} from "./style"

export default function WaiterPage() {

    const {loading, error, data, refetch } = useQuery(GET_ALL_ORDER);
    const [modalVisible, setModalVisible] = useState(false);
    const [showOrder, setShowOrder] = useState('');
    const [activeOrder, setActiveOrder] = useState('');
    const [content, setContent] = useState('tables');

    useEffect(() => {
        if(data){
            (data.orderAll).sort((a,b)=>{
                return (+b.updated_at)-(+a.updated_at)
            });
            setActiveOrder(data.orderAll[0])
        }
    }, [data]);

    const updateData=()=>{
        try{
            refetch();
        }
        catch (error) {
            console.log('ERROR gql-refetch in WaiterPage', error)
        }
    };

    const tables=[1,2,3,4,5,6,7,8];

    return (
         <ImageBackground source={require('../../img/bgc.jpg')} style={styles.wrap}>
                 {data?
            (<SafeAreaView>
                <Header
                    orders={data.orderAll}
                    updateData={updateData}
                    content={content}
                    setContent={setContent}
                    setModalVisible={setModalVisible}
                    setOpenOrder={setShowOrder}
                    activeOrder={activeOrder}
                    setActiveOrder={setActiveOrder}/>
                {content==='tables'?
                    (<OrdersPage
                        tables={tables}
                        updateData={updateData}
                        orders={data.orderAll}
                        setModalVisible={setModalVisible}
                        setActiveOrder={setActiveOrder}
                        setOpenOrder={setShowOrder}/>):
                    (<MenuPage
                        activeOrder={activeOrder}/>)}
                {showOrder?(
                <ModalOrder
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    updateData={updateData}
                    order={showOrder}
                    setShowOrder={setShowOrder}/>):null}
            </SafeAreaView>) : null}
         </ImageBackground>
    )
}


