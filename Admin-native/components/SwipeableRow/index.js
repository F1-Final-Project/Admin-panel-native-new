import React, {useContext, useEffect} from 'react';
import {Animated, StyleSheet, Text, View, I18nManager} from 'react-native';
import {Context} from '../../context/appContext'

import {RectButton} from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';
import {useLazyQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";


const GET_DISH_BY_ID = gql`
                    query getDishById($id: ID!){
                      dish(id: $id){
                        title
                      description
                      img
                      category {
                        id
                        title
                      }
                      ingredients {
                        id
                        title
                      }
                      price
                      weight
                      }
                    }
                `;

export default function AppleStyleSwipeableRow(props) {

    const {ModalVisible, item} = props;
    const {dispatch, state} = useContext(Context);


    const [getDish, {loading, data}] = useLazyQuery(GET_DISH_BY_ID,
        {
            fetchPolicy: "cache-and-network"
        });

    useEffect(() => {
        getDish({
            variables: {id: item.id}
        });
    }, [getDish, data]);

    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });
        return (
            <RectButton style={styles.leftAction} onPress={close}>
                <Animated.Text
                    style={[
                        styles.actionText,
                        {
                            transform: [{translateX: trans}],
                        },
                    ]}>
                    Delete
                </Animated.Text>
            </RectButton>
        );
    };
    const renderRightAction = (text, color, x, progress) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            close();

            ModalVisible(true);

            dispatch({
                type: 'editItem',
                payload: data.dish,
            });

        };

        return (
            <Animated.View style={{flex: 1, transform: [{translateX: trans}]}}>
                <RectButton
                    style={[styles.rightAction, {backgroundColor: color}]}
                    onPress={pressHandler}>
                    <Text style={styles.actionText}>{text}</Text>
                </RectButton>
            </Animated.View>
        );
    };

    const renderRightActions = progress => (
        <View style={{width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row'}}>
            {renderRightAction('Edit', '#d0cdc7', 192, progress)}
        </View>
    );

    let _swipeableRow;

    const updateRef = ref => {
        _swipeableRow = ref;
    };

    const close = () => {
        _swipeableRow.close();
    };

    const {children} = props;

    return (
        <Swipeable
            ref={updateRef}
            friction={2}
            leftThreshold={30}
            rightThreshold={40}
            renderLeftActions={renderLeftActions}
            renderRightActions={renderRightActions}>
            {children}
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: "#E9C294",
        justifyContent: 'center',
    },
    actionText: {
        color: "#212121",
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});
