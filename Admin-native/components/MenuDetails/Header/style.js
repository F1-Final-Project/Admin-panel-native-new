import {Dimensions, StyleSheet} from "react-native";let screenWidth = Dimensions.get('window').width;let screenHeight = Dimensions.get('window').height;const scaleToDimension = (size) => {    return screenWidth * size / 375};export const styles = StyleSheet.create({    mainHeader: {        flex: 1, flexDirection: 'row',        justifyContent: 'flex-start',        alignItems: 'center',        marginTop: 20,        marginBottom: 15,    },    mainTitle: {        color: '#E9C294',        fontWeight: 'bold',        fontSize: scaleToDimension(35),    },    goBack: {        position: 'absolute',        right: 10,        top: 10,        color: '#E9C294',        fontSize: scaleToDimension(15)    },    imageItem: {        marginRight: 10,        width: 51,        height: 51,        resizeMode: 'contain',    },    detailTopContainer: {        height: scaleToDimension(130),        width: screenWidth,        borderBottomColor: '#E9C294',        borderBottomWidth: 5,        shadowColor: "black",        shadowOffset: {            width: 0,            height: 7,        },        shadowOpacity: 0.43,        shadowRadius: 9.51,        elevation: 15,    },    detailTopBottomSubContainer: {        width: screenWidth - 30,        backgroundColor: 'transparent',        position: 'absolute',        bottom: 15,        left: 15,        right: 15,    },});