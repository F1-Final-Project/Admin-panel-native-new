import {Dimensions, StyleSheet} from "react-native";let screenWidth = Dimensions.get('window').width;let screenHeight = Dimensions.get('window').height;export const styles = StyleSheet.create({    bottomGridContainer: {        marginLeft: 5,        width: screenWidth,        height: 250 + 10,        flexDirection: 'column',        justifyContent: 'center'    },    bottomGridItemContainer: {        marginLeft: 5,        marginRight: 5,        marginTop: 10,        marginBottom: 10,        width: 250,        height: 250,        flexDirection: 'column',        justifyContent: 'center',        borderRadius: 15,        borderWidth: 2,        borderColor: '#E9C294',        shadowColor: "black",        shadowOffset: {            width: 0,            height: 7,        },        shadowOpacity: 0.43,        shadowRadius: 9.51,        elevation: 15,    },    shadowItem: {    },    bottomGridItemText: {        marginLeft: 15,        marginRight: 10,        position: 'absolute',        bottom: 20,        color: '#E9C294',        fontWeight: 'bold',        fontSize: 35,    },    imageItem: {        marginRight: 'auto',        marginLeft: 'auto',        width: 51,        height: 51,        resizeMode: 'contain',    }});