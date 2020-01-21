import React from "react";
import { View, Text } from "react-native";
import {styles} from './style';

const Header = ({ title, children }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.header_text}>{title}</Text>
            <View style={styles.childrenContainer}>{children}</View>
        </View>
    );
};


export default Header;
