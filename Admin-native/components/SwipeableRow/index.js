import React, {useContext, useEffect} from 'react';
import {Animated, StyleSheet, Text, View, I18nManager, Alert} from 'react-native';
import {Context} from '../../context/appContext'

import {RectButton} from 'react-native-gesture-handler';

import Swipeable from 'react-native-gesture-handler/Swipeable';


export default function AppleStyleSwipeableRow(props) {

    const {ModalVisible, data, item, deleteItem} = props;
    const {dispatch, state} = useContext(Context);



    const renderLeftActions = (progress, dragX) => {
        const trans = dragX.interpolate({
            inputRange: [0, 50, 100, 101],
            outputRange: [-20, 0, 0, 1],
        });

        const pressHandler = () => {

            Alert.alert(
                'Delete',
                'Are you sure you want to delete',
                [
                    {
                        text: 'Cancel',
                        onPress: () => close(),
                        style: 'cancel',
                    },
                    {text: 'OK', onPress: () => deleteItem(item.id)},
                ],
                {cancelable: false},
            );

        };

        return (
            <RectButton style={styles.leftAction} onPress={pressHandler}>
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

    const renderRightAction = (text, color, x, progress, id) => {
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
                nameSection: id,
                itemId: item.id,
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
            {renderRightAction('Edit basic', '#d0cdc7', 192, progress, 1)}
            {renderRightAction('Edit advanced', '#928f8b', 192, progress, 2)}
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
