import {Dimensions, StyleSheet} from "react-native";let screenWidth = Dimensions.get('window').width;let screenHeight = Dimensions.get('window').height;export const styles = StyleSheet.create({    bottomTabBarContainer: {        height: 60.0,        marginTop: 15,        width: screenWidth,        flexDirection: 'column'    },    barItemContainer: {        justifyContent: 'center',        flex: 1    },    barItemText: {        marginLeft: 15,        marginRight: 10,        color: '#82796d',        fontSize: 22,        fontWeight: '300'    }});