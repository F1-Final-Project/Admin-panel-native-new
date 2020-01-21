import React from "react";
import {Icon} from "react-native-elements";
import {
    FlatList,
    Text,
    TouchableWithoutFeedback,
    View
} from "react-native";
import {styles} from "./style";

export default (props) => {
    const {data, setContent, setCategory} = props;

    const renderTapBarItem = (item, index) => {
        return (
            <TouchableWithoutFeedback
                onPress={() => {
                    setCategory(item._id);
                    setContent('menuDetails');
                }}>
                <View style={styles.barItemContainer}>
                    <Text style={styles.barItemText}>
                        {item.title}
                    </Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    return (
        <View style={styles.bottomTabBarContainer}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={data}
                renderItem={({item, index}) => renderTapBarItem(item, index)}
            />
        </View>
    )
}

