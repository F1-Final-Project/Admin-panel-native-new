import React, {useEffect, useState, useReducer} from 'react'
import {
    Text,
    TouchableHighlight,
    Alert,
    ScrollView,
    StyleSheet,
    Dimensions, ImageBackground,
    View,
    Button,
    PanResponder, Animated,Keyboard
} from "react-native";
import {FlatList} from 'react-native-gesture-handler';
import DishItem from '../components/DishItem'

import AppleStyleSwipeableRow from '../components/SwipeableRow';
import {useQuery} from "@apollo/react-hooks";
import {gql} from "apollo-boost";
import AnimatedModal from '../components/AnimatedModal'
import ModalItem from '../components/AnimatedModal/ModalItem'
import {Context} from '../context/appContext'
import reducer from '../Reducer'
import {initState} from '../Reducer/initStateDish'


const GET_ALL_DISH = gql`{
  dishAll{
    id,
    title,
    description,
    category {
      id,
      title
    }
  }
}
  `;



export default function IngredientsStoreScreen() {

    const {loading, error, data} = useQuery(GET_ALL_DISH);

    const [allDish, setAllDish] = useState([]);


    const [state, dispatch] = useReducer(reducer, initState);

    useEffect(() => {
        if (!loading && data !== undefined && !error) {
            setAllDish(data.dishAll)
        }

    }, [data]);

    const Row = ({item}) => {
        return (
            <DishItem item={item}/>
        )
    };


    const SwipeableRow = ({item, index, ModalVisible}) => {
        return (
            <AppleStyleSwipeableRow ModalVisible={ModalVisible} item={item}>
                <Row item={item} nameSection={'Categories'}/>
            </AppleStyleSwipeableRow>
        );

    };

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleCloseModal = () => {

        setIsModalVisible(false);

        dispatch({
            type: 'editItem',
            payload: '',
        });

    };


    return (
        <Context.Provider value={{
            dispatch, state
        }}>
            <ImageBackground source={require('../img/bgc.jpg')} style={styles.projectBgc}>

                <FlatList
                    style={styles.listContainer}
                    data={loading && allDish === undefined ? [] : allDish}
                    ItemSeparatorComponent={() => <View style={styles.separator}/>}
                    renderItem={({item, index}) => {
                        return (
                            <SwipeableRow item={item} index={index} ModalVisible={setIsModalVisible}/>
                        )
                    }}
                    keyExtractor={(item, index) => `message ${index}`}
                />
                <AnimatedModal
                    title={"Edit"}
                    visible={isModalVisible}
                    onClose={() => handleCloseModal()}
                ><ModalItem/></AnimatedModal>
            </ImageBackground>
        </Context.Provider>
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
        //width: '90%',

    }

});

