import React, {useState, useReducer, useContext, useCallback, useEffect, useMemo} from 'react'
import {
    StyleSheet,
    Dimensions, ImageBackground,
    View,
} from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import AnimatedModal from '../../components/AnimatedModal'
import ModalItem from '../../components/AnimatedModal/ModalItem'
import DishSwipeableRow from './DishSwipeableRow'
import {Context} from "../../context/appContext";


export default function Dishes(props) {

    const {data, updateItems, deleteItem} = props;
    const {dispatch, state} = useContext(Context);


    const [isModalVisible, setIsModalVisible] = useState(false);

    const [allDish, setAllDish] = useState([]);


    useEffect(() => {

        if (data) {

            setAllDish(data.dishAll);
        }

    }, [data]);


    const handleCloseModal = () => {
        setIsModalVisible(false);

        if (state.saveOrClose === true) {
            updateItems()
        }

        dispatch({
            type: 'editItem',
            payload: '',
            saveOrClose: false
        });

    };

    return (
        <ImageBackground source={require('../../img/bgc.jpg')} style={styles.projectBgc}>

            <FlatList
                style={styles.listContainer}
                data={allDish === undefined ? [] : allDish}
                ItemSeparatorComponent={() => <View style={styles.separator}/>}
                renderItem={({item, index}) => {
                    return (
                        <DishSwipeableRow item={item} index={index} ModalVisible={setIsModalVisible} data={data} deleteItem={deleteItem}/>
                    )
                }}
                keyExtractor={(item, index) => `message ${index}`}
            />
            <AnimatedModal
                title={"Edit"}
                visible={isModalVisible}
                onClose={() => handleCloseModal()}
            ><ModalItem data={data} setAllDish={setAllDish}/></AnimatedModal>
        </ImageBackground>
    )
}

const {height, width} = Dimensions.get("window");

const styles = StyleSheet.create({
    projectBgc: {
        width: width,
        height: height,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: '#212121',
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        borderBottomWidth: 1,
        borderBottomColor: '#E9C294',
    },
    listContainer: {
        marginTop: '10%',
    }

});

