import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home/Home";

const HomeStackScreen = () => {
    const HomeStack = createNativeStackNavigator();

    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <HomeStack.Screen name="HomeStack" component={Home} />
            
        </HomeStack.Navigator>
    );
};

export default HomeStackScreen;
