import React, {useContext, useEffect} from "react";
import {
    View,
    Text,
    Animated,
    Easing,
    Dimensions,
    TouchableOpacity, Keyboard,TouchableWithoutFeedback
} from "react-native";

import Header from "../Header";
import {Context} from "../../context/appContext";

const {height, width} = Dimensions.get("window");


export default function AnimatedModal(props) {

    const {dispatch, state} = useContext(Context);
    const yTranslate = new Animated.Value(0);
    const {visible, title, children, onClose} = props;

    useEffect(() => {
        if (visible) {
            yTranslate.setValue(0);

            Animated.spring(yTranslate, {
                toValue: 1,
                friction: 5
            }).start();
        } else {
            Animated.timing(yTranslate, {
                toValue: 0,
                duration: 0,
                easing: Easing.linear
            }).start();

        }

    }, [visible]);


    let negativeHeight = -height + 35;

    let modalMoveY = yTranslate.interpolate({
        inputRange: [0, 1],
        outputRange: [0, negativeHeight]
    });

    const translateStyle = {transform: [{translateY: modalMoveY}]};

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Animated.View style={[styles.container, translateStyle]}>
                <Header title={title}>
                    <TouchableOpacity onPress={onClose}>
                        <Text style={styles.closeText}>Close</Text>
                    </TouchableOpacity>
                </Header>
                <View style={styles.modalContent}>{children}</View>
            </Animated.View>
        </TouchableWithoutFeedback>
    )
}

const styles = {
    container: {
        position: "absolute",
        height: height,
        width: width,
        bottom: -height,
        backgroundColor: '#212121'
    },
    modalContent: {
        flex: 1,
        alignItems: "stretch",
        paddingTop: 30
    },
    closeText: {
        fontSize: 17,
        color: "#E9C294",
    }
};
