import React from "react";import {Icon} from "react-native-elements";import {Dimensions, FlatList, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View} from "react-native";export default (props) => {    const {data} = props;    const renderTapBarItem = (item, index) => {        return (            <TouchableWithoutFeedback                onPress={() => {                    // navigation                }}>                <View style={styles.barItemContainer}>                    <Text style={styles.barItemText}>                        {item['key']}                    </Text>                </View>            </TouchableWithoutFeedback>        );    };    return (        <View style={styles.bottomTabBarContainer}>            <FlatList                showsHorizontalScrollIndicator={false}                horizontal={true}                data={data}                renderItem={({item, index}) => renderTapBarItem(item, index)}            />        </View>    )}let screenWidth = Dimensions.get('window').width;let screenHeight = Dimensions.get('window').height;const styles = StyleSheet.create({    bottomTabBarContainer: {        height: 60.0,        marginTop: 15,        width: screenWidth,        flexDirection: 'column'    },    barItemContainer: {        justifyContent: 'center',        flex: 1    },    barItemText: {        marginLeft: 15,        marginRight: 10,        color: '#e9d193',        fontSize: 22,        fontWeight: 'bold'    }});