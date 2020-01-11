import React from 'react';
import AuthLoading from '../components/AuthLoading';

export default function AuthLoadingScreen() {
    return <AuthLoading/>
}

AuthLoadingScreen.navigationOptions = {
    header: null,
};
