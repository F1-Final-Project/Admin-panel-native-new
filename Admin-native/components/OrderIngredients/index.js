import React from 'react'
import {
    ImageBackground,
    ScrollView,
    View,
    SafeAreaView,
    Text
} from "react-native";
import Header from '../Menu/Header';
import OrderList from './OrderList';
import Loading from '../Loading'
import {styles} from '../Menu/style';
import Filter from '../../services/Filters';
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";

const GET_ALL_ORDERINGREDIENTS = gql`{
  orderIngredientAll{
    _id,
    order {
      title,
      restInStock
    },
    orderCategory {
      title
    },
    editingOrder,
    pendingOrder,
    orderHasArrived
  }
}
  `;

export default function OrderIngredients({navigation}) {

    const {loading, error, data} = useQuery(GET_ALL_ORDERINGREDIENTS);

    console.log(data);

    return (
        <ImageBackground source={require('../../img/bgc.jpg')} style={styles.projectBgc}>
            {data ?
                <SafeAreaView style={styles.mainContainer}>
                    <Header navigation={navigation}/>
                    <ScrollView style={styles.mainContainer}>
                        <View>
                            <Text style={styles.mainPhrase}>
                                Ordering ingredients in stock
                            </Text>
                            <Text style={styles.secondPhrase}>
                                Ordering ingredients
                            </Text>
                            <OrderList data={Filter.filterCategoriesOrdering(data.orderIngredientAll)}/>
                            <Text style={styles.secondPhrase}>
                                Archiving orders
                            </Text>
                            <OrderList data={Filter.filterCategoriesArchived(data.orderIngredientAll)}/>
                        </View>
                    </ScrollView>
                </SafeAreaView>
                : <Loading/>
            }
        </ImageBackground>
    );
}

