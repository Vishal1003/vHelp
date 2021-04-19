import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import MapScreen from "../screens/Map/MapScreen";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Map"
                component={MapScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default function MapNavigator() {
    return <MyStack />;
}
