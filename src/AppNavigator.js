import { View, Text, Image } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ListNews from './home/ListNews';
import { AppContext } from './AppContext';
import Login from './account/Login';
import Register from './account/Register';
import Me from './Me';
import NewsDetails from './home/NewsDetails';
import PostNews from './post/PostNews';

// login, register => stack
const Stack = createNativeStackNavigator();
const User = () => {
    return (
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown:false}}>
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen name='Register' component={Register} />
        </Stack.Navigator>
    )
}

const News = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name='ListNews' component={ListNews} />
            <Stack.Screen name='NewsDetails' component={NewsDetails} />
        </Stack.Navigator>
    )
}

// list news, profile, news manager => tab
const Tab = createBottomTabNavigator();
const Main = () => {
    return (
        <Tab.Navigator
            screenOptions={({route}) => ({ // set icon tab navi
                tabBarIcon: ({focused, color, size}) => {
                    if(route.name === 'News') {
                        return <Image style={{width: 25, height: 25}} source={require('../images/icons8-home-page-60.png')} />
                    } else if (route.name === 'PostNews') {
                        return <Image style={{width: 25, height: 25}} source={require('../images/icons8-newspaper-48.png')} />
                    }else if (route.name === 'Me') {
                        return <Image style={{width: 25, height: 25}} source={require('../images/icons8-user-48.png')} />
                    }
                },
                tabBarActiveTintColor: '#808000',
                tabBarInactiveTintColor: 'gray',
                headerShown: false
            })}
        >
            <Tab.Screen name='News' component={News} options={{title: 'Trang chủ'}}/>
            <Tab.Screen name='PostNews' component={PostNews}  options={{title: 'Đăng tin'}}/>
            <Tab.Screen name='Me' component={Me}  options={{title: 'Cá nhân'}}/>
        </Tab.Navigator>
    )
};

const AppNavigator = () => {
    const {isLogin} = useContext(AppContext);
  return (
    <>
    {
        isLogin == false ? <User/> : <Main/>
    }
    </>
  )
};

export default AppNavigator;