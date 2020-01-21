import React, {lazy, useState} from 'react';import {    View,    ImageBackground} from 'react-native';import {useNavigationParam} from "react-navigation-hooks";import {useQuery} from "@apollo/react-hooks";import Header from './Header';import MenuDetailsList from "./MenuDetailsList";import {MENU_LIST_QUERY} from './queries';import {styles} from './style';import Filter from "../../services/Filters";import BouncingPreloader from 'react-native-bouncing-preloader';import Loading from '../Loading';export default () => {    const id = useNavigationParam('_id');    const { loading, error, data } = useQuery(MENU_LIST_QUERY, {        variables: { id },    });    console.log(id);    // JUST FOR FUN :)    const [moreLoading, setMoreLoading] = useState(true);    if(data){        setTimeout(() => (setMoreLoading(false)), 500)    }    return (        <ImageBackground source={require('../../img/bgc.jpg')} style={styles.projectBgc}>            {moreLoading ?                <Loading/> :                <View style={styles.DetailMainContainer}>                    <Header id={id} data={data}/>                    <MenuDetailsList data={Filter.filterDishByIdCategory(data.dishAll, id)}/>                </View>            }        </ImageBackground>    );};