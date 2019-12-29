import React from "react";import {Icon} from "react-native-elements";import {    FlatList,    Text,    TouchableWithoutFeedback,    View} from "react-native";import {styles} from "./style";import {useNavigation} from "react-navigation-hooks";export default (props) => {    const {data} = props;    const {navigate} = useNavigation();    const renderTapBarItem = (item, index) => {        return (            <TouchableWithoutFeedback                onPress={() => {                    navigate('MenuDetails', {id: item.id})                }}>                <View style={styles.barItemContainer}>                    <Text style={styles.barItemText}>                        {item.title}                    </Text>                </View>            </TouchableWithoutFeedback>        );    };    return (        <View style={styles.bottomTabBarContainer}>            <FlatList                showsHorizontalScrollIndicator={false}                horizontal={true}                data={data}                renderItem={({item, index}) => renderTapBarItem(item, index)}            />        </View>    )}