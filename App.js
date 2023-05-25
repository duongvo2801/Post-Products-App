import { StatusBar } from 'expo-status-bar';
import { NativeModules, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import React, { Component } from 'react'
import Login from './src/account/Login';
import ItemListNew from './src/home/ItemListNew';
import ListNews from './src/home/ListNews';
import NewsDetails from './src/home/NewsDetails';
import Register from './src/account/Register';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContextProvider } from './src/AppContext';
import AppNavigator from './src/AppNavigator';

export default class App extends Component {
  render() {
    const {StatusBarManager} = NativeModules;
    return (
      <SafeAreaView style={{ flex: 1, paddingTop: Platform.OS === 'android' ? StatusBarManager.HEIGHT : 0,
       }}>

        <StatusBar barStyle="dark-content" hidden={false} backgroundColor="#00BCD4" translucent={true} />
        <AppContextProvider>
          <NavigationContainer>
            <AppNavigator/>
          </NavigationContainer>
        </AppContextProvider>
        
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  
});
