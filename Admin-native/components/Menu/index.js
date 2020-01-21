import React, {useEffect, useState} from 'react'
import {
    ImageBackground,
    StyleSheet,
    ScrollView,
    Dimensions,
    View,
    SafeAreaView,
    Text
} from "react-native";

import Search from './Search';
import MenuDetails from '../MenuDetails';
import NavBar from './NavBar';
import MenuList from './MenuList';
import Loading from '../Loading'
import {styles} from './style';
import Filter from '../../services/Filters';

import withHoc from './indexHoc';

export default withHoc((props) => {
    const {categoryAll} = props.data;

    const[content, setContent]=useState('menu')
    const[category, setCategory]=useState('5dd0a8c6084bb372ff2e619b');
    return (

        <ScrollView>
        {content==='menu'?
        (<View>
            {categoryAll ?
                <SafeAreaView style={styles.mainContainer}>

                    <ScrollView style={styles.mainContainer}>
                        <View>
                            <Text style={styles.mainPhrase}>
                                What you want to eat today?
                            </Text>
                            <Search/>
                            <NavBar setContent={setContent} setCategory={setCategory} data={categoryAll ? categoryAll : []}/>
                            <Text style={styles.secondPhrase}>
                                Category Menu
                            </Text>
                            <MenuList setContent={setContent} setCategory={setCategory} data={Filter.filterCategoryMenu(categoryAll)}/>
                            <Text style={styles.secondPhrase}>
                                Drink Menu
                            </Text>
                            <MenuList setContent={setContent} setCategory={setCategory} data={Filter.filterDrink(categoryAll)}/>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                : <Loading/>
            }
            </View>):
            (<MenuDetails order={props.activeOrder} setContent={setContent} id={category}/>)}
        </ScrollView>

    );
});

