import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProductForm from "../screens/AddProduct/ProductForm";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Product Form"
                component={ProductForm}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default function AddProductNavigator() {
    return <MyStack />;
}
