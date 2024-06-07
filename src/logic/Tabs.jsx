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
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { clearUser } from './Redux/reducers/AuthReducer';
import Pedidos from '../screens/pedidos/Pedidos';
import Algo from '../screens/algo';

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
          tabBarLabel: "Articulos",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="article" color={color} size={size} />
          ),
        }}
        
        />

    <TabsStack.Screen 
        name="Pedidos" 
        component={Pedidos}
        options={{
          tabBarLabel: "Pedidos",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="truck-delivery-outline" color={color} size={size} />
          ),
        }}
        
        />

<TabsStack.Screen 
        name="Log Out" 
        component={Algo}
        options={{
          tabBarLabel: "LogOut",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="logout" color={color} size={size} />
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