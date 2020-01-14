import React, {useState} from 'react';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import * as Font from 'expo-font';
import {AsyncStorage, Platform, StatusBar, StyleSheet, View} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import AppNavigator from './navigation/AppNavigator';
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloClient, HttpLink, InMemoryCache} from 'apollo-boost'
import {concat} from 'apollo-link';
import {setContext} from 'apollo-link-context';

const httpLink = new HttpLink({uri: 'https://f1-graphql-server.herokuapp.com/graphql'});

/**
 * @desc Настройка контекста для передачи авторизационного Token на сервер
 */

const authHeader = setContext(
    request =>
        new Promise((success, fail) => {
            AsyncStorage.getItem('token').then(token => success({headers: {authorization: `Bearer ${token}`}}))
        })
);

/**
 * @desc Конфигурация и кэширования ApolloClient с Link и Token
 */

const client = new ApolloClient({
    link: concat(authHeader, httpLink),
    cache: new InMemoryCache(),
});

/**
 * @desc Настройка основных цветов приложения для react-native-paper
 */

const theme = {
    ...DefaultTheme,
    roundness: 0,
    colors: {
        ...DefaultTheme.colors,
        primary: "#E9C294",
        accent: "#d0cdc7",
        background: "#212121",
        surface: "#212121",
        text: "#d0cdc7",
        backdrop: "#212121",
        placeholder: '#d0cdc7'

    },
    fonts: {
        ...DefaultTheme.fonts
    }
};

export default function App(props) {
    const [isLoadingComplete, setLoadingComplete] = useState(false);

    if (!isLoadingComplete && !props.skipLoadingScreen) {
        return (
            <PaperProvider theme={theme}>
                <AppLoading
                    startAsync={loadResourcesAsync}
                    onError={handleLoadingError}
                    onFinish={() => handleFinishLoading(setLoadingComplete)}
                />
            </PaperProvider>
        );
    } else {
        return (
            <ApolloProvider client={client}>
                <PaperProvider theme={theme}>
                    <View style={styles.container}>
                        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
                        <AppNavigator/>
                    </View>
                </PaperProvider>
            </ApolloProvider>
        );
    }
}


async function loadResourcesAsync() {
    await Promise.all([
        Asset.loadAsync([
            require('./assets/images/robot-dev.png'),
            require('./assets/images/robot-prod.png'),
        ]),
        Font.loadAsync({
            // This is the font that we are using for our tab bar
            ...Ionicons.font,
            // We include SpaceMono because we use it in HomeScreen.js. Feel free to
            // remove this if you are not using it in your app
            'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        }),
    ]);
}

function handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
}

function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#212121',
    },
});
