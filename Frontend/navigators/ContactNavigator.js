import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Contact from "../screens/Vendor/Contact";
import UserDetail from "../components/ListOfUsers/UserDetail";
const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Contact"
                component={Contact}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Vendor Details"
                component={UserDetail}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default function ContactNavigator() {
    return <MyStack />;
}
