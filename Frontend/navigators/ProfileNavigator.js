import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import UserDetail from "../components/ListOfUsers/UserDetail";
import Contact from "../screens/Vendor/Contact";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Edit Profile"
                component={EditProfileScreen}
                options={{
                    headerShown: true
                }}
            />
        </Stack.Navigator>
    );
}

export default function ProfileNavigator() {
    return <MyStack />;
}
