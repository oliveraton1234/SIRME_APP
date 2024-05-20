import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Login from '../screens/login/Login';
import Register from '../screens/register/Register';
import { restoreSession } from './Redux/actions/authActions';

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
        {/* <TabsStack.Screen 
        name="Home" 
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Noticicas",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="newspaper-outline" color={color} size={size} />
          ),
        }}
        
      />
      <TabsStack.Screen 
        name="Radio" 
        component={Radio} 
        options={{
          tabBarLabel: "Radio",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-outline" color={color} size={size} />
          ),
        }}
      />
      <TabsStack.Screen 
        name="Perfil" 
        component={Perfil} 
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Feater name="user" color={color} size={size} />
          ),
        }}
      /> */}
    </TabsStack.Navigator>
);


const Tabs = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(restoreSession());
    }, [dispatch]);

    const user = useSelector((state) => state.auth.user);
    // AsyncStorage.clear()

    return (
        <NavigationContainer>
            {user ? <MainFlow /> : <AuthFlow />}
        </NavigationContainer>
    );
}



export default Tabs;