import React from 'react'
import {Text} from "react-native";
import {RectButton} from "react-native-gesture-handler";
import {styles} from './style';


export default function DishItem(props) {

    const {item} = props;

    return (
        <RectButton style={styles.rectButton} onPress={() => alert(item.description)}>
            <Text style={styles.titleText}>{item.title ? item.title : 'no Name'}</Text>
            <Text numberOfLines={2} style={styles.descriptionText}>
                {item.description ? item.description : ''}
            </Text>
            <Text style={styles.categoryTitleText}>
                {item.category ? item.category.title : ''}
            </Text>
        </RectButton>
    )
}

