import React, {useRef, useState, useEffect} from 'react';
import {
    View,
    Text,
    ScrollView,
    ImageBackground, Dimensions
} from 'react-native';
import {Modalize} from "react-native-modalize";

import {useQuery} from "@apollo/react-hooks";
import { ORDER_BY_ID } from '../../../graphql/order';
import ModalItem from './Modaltem';
import ItemCard from './ItemCard';
import { Backdrop } from "react-native-backdrop";

import {styles} from './style';
import Overlay from "react-native-modal-overlay";
let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

// export default ({dishes, order}) => {
//     const [dataInfo, setDataInfo] = useState({});
//     const [openModal, setOpenModal] = useState(false);
//
//     const handleOpen = () => {
//         setOpenModal(true);
//     };
//
//     const handleClose = () => {
//         setOpenModal(false);
//     };
//
//     return (
//         <View>
//
//             {dishes.map(item => (
//                 <ItemCard key={item.id} setDataInfo={setDataInfo} setOpenModal={setOpenModal} item={item} order={order}/>
//             ))}
//             <View>
//                 <Modalize modalStyle={styles.modal} handleStyle={styles.modalHandle} withReactModal={true}>
//                     {/*<ImageBackground source={require('../../../img/bgc.jpg')} style={styles.projectBgc}>*/}
//                         <ModalItem dataInfo={dataInfo}/>
//                     {/*</ImageBackground>*/}
//                 </Modalize>
//             </View>
//                 {/*<Backdrop*/}
//                 {/*    visible={openModal}*/}
//                 {/*    handleOpen={handleOpen}*/}
//                 {/*    handleClose={handleClose}*/}
//                 {/*    swipeConfig={{*/}
//                 {/*        velocityThreshold: 0.3,*/}
//                 {/*        directionalOffsetThreshold: 80,*/}
//                 {/*    }}*/}
//                 {/*    animationConfig={{*/}
//                 {/*        speed: 14,*/}
//                 {/*        bounciness: 4,*/}
//                 {/*    }}*/}
//                 {/*    overlayColor="rgba(0,0,0,0.32)"*/}
//                 {/*    backdropStyle={{*/}
//                 {/*        backgroundColor: '#fff',*/}
//                 {/*    }}>*/}
//                 {/*    <View>*/}
//                 {/*        <ModalItem dataInfo={dataInfo}/>*/}
//                 {/*    </View>*/}
//                 {/*</Backdrop>*/}
//
//         </View>
//
//     );
// };
export default ({data, order}) => {
    const modalRef = useRef(null);
    const [dataInfo, setDataInfo] = useState({});

    return (
        <ScrollView style={styles.detailList}>
            {data.map(item => (
                <ItemCard key={item._id} modalRef={modalRef} setDataInfo={setDataInfo} item={item} order={order}/>
            ))}
            <View>
                <Modalize modalStyle={styles.modal} handleStyle={styles.modalHandle} withReactModal={true} ref={modalRef}>
                    <ImageBackground source={require('../../../img/bgc.jpg')} style={styles.projectBgc}>
                        <ModalItem dataInfo={dataInfo}/>
                    </ImageBackground>
                </Modalize>
            </View>
        </ScrollView>
    );
};

