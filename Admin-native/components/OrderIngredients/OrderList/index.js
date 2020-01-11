import React from "react";
import {
    Dimensions,
    FlatList,
    Image, StyleSheet,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import {Transition} from "react-navigation-fluid-transitions";

export default (props) => {
    const {data} = props;

    /**
     * @desc Функция для отображения списка заказных ингредиентов
     * @param item - элемент массива
     * @param index
     */

    const renderListItem = (item, index) => {
        return (
            <View>
                <Text style={styles.bottomGridItemTextList}>
                    {item.title} - {item.restInStock}
                </Text>
            </View>
        )
    };

    /**
     * @desc Функция для отображения секций vertical прокрутки
     * @param item - элемент массива
     * @param index
     */

    const renderGridItem = (item, index) => {
        return (
            <TouchableOpacity style={styles.shadowItem}
                              activeOpacity={1}
                              >
                {item.order.map(i => {
                    return (
                        <Transition shared={i.title}>
                            <View style={styles.bottomGridItemContainer}>
                                {item.editingOrder && <Image
                                    style={styles.imageItem}
                                    source={require(`../../../img/contract.png`)}
                                />}
                                {item.pendingOrder && <Image
                                    style={styles.imageItem}
                                    source={require(`../../../img/mail-send.png`)}
                                />}
                                {item.orderHasArrived && <Image
                                    style={styles.imageItem}
                                    source={require(`../../../img/approve-invoice.png`)}
                                />}
                                <FlatList
                                    style={styles.bottomGridItemText}
                                    onPress
                                    data={item.order}
                                    renderItem={({item, index}) => renderListItem(item, index)}
                                    keyExtractor={(item, index) => `order ${index}`}
                                />
                            </View>
                        </Transition>
                    )
                })
                }

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
                keyExtractor={(item, index) => `ingredient ${index}`}
            />
        </View>
    )
}

let screenWidth = Dimensions.get('window').width;
let screenHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
    bottomGridContainer: {
        marginLeft: 5,
        width: screenWidth,
        height: 250 + 10,
        flexDirection: 'column',
        justifyContent: 'center'
    },
    bottomGridItemContainer: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        width: 250,
        height: 250,
        flexDirection: 'column',
        justifyContent: 'center',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#E9C294',
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.43,
        shadowRadius: 9.51,
        elevation: 15,
    },
    shadowItem: {

    },
    bottomGridItemText: {
        marginLeft: 15,
        marginRight: 10,
        position: 'absolute',
        bottom: 20,
        color: '#E9C294',
        fontWeight: 'bold',
        fontSize: 35,
    },
    imageItem: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 100,
        height: 100,
        resizeMode: 'contain',
        opacity: .5 ,
    },
    bottomGridItemTextList: {
        color: '#E9C294',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

