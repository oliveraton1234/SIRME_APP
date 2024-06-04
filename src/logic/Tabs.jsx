import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import { restoreSession } from './Redux/actions/authActions';
import HomeStackScreen from './Stacks/HomeStack';
import Foundation from "react-native-vector-icons/Foundation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser } from './Redux/reducers/AuthReducer';

const TabsStack = createBottomTabNavigator();
const AuthStack = createStackNavigator();

const AuthFlow = () => (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
        <AuthStack.Screen name="Login" component={Login} />
        <AuthStack.Screen name="Register" component={Register} />
    </AuthStack.Navigator>
);

const MainFlow = () => (
    <TabsStack.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#B50404",
            tabBarLabelStyle: {
                marginBottom: 5,
            }
        }}
    >
        <TabsStack.Screen 
        name="Home" 
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Noticicas",
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={size} />
          ),
        }}
        
        />
      
    </TabsStack.Navigator>
);


const Tabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch]);

    // AsyncStorage.clear()
    // dispatch(clearUser());
    const user = useSelector((state) => state.auth.user);

    return (
        <NavigationContainer>
            {user ? <MainFlow /> : <AuthFlow />}
        </NavigationContainer>
    );
}



export default Tabs;