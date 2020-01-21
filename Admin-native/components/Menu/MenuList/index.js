
import React from "react";
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Transition} from "react-navigation-fluid-transitions";
import {styles} from "./style";
import {useNavigation} from "react-navigation-hooks";

export default (props) => {
    const {data, setContent, setCategory} = props;

    const renderGridItem = (item, index) => {
        return (
            <TouchableOpacity style={styles.shadowItem}
                activeOpacity={1}
                onPress={() => {
                    setCategory(item._id);
                    setContent('menuDetails')
                }}>
                <Transition shared={item.title}>
                    <View style={styles.bottomGridItemContainer}>
                        <Image
                            style={styles.imageItem}
                            source={{
                                uri: item.icon,
                            }}
                        />
                            <Text style={styles.bottomGridItemText}>{item.title}</Text>
                    </View>
                </Transition>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.bottomGridContainer}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                onPress
                horizontal={true}
                data={data}
                renderItem={({item, index}) => renderGridItem(item, index)}
            />
        </View>
    )
}

