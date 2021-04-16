import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductContainer from "../screens/Home/ProductContainer";
import ProductDetails from "../screens/Home/ProductDetails";
// import SingleProduct from "../screens/Home/";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={ProductContainer}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Product Details"
                component={ProductDetails}
                options={{
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    );
}

export default function HomeNavigator() {
    return <MyStack />;
}
