import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
// Stacks
import HomeNavigator from "./HomeNavigator";
import AddProductNavigator from "./AddProductNavigator";
import ProfileNavigator from "./ProfileNavigator";
import MapNavigator from "./MapNavigator";
import ContactNavigator from "./ContactNavigator";
const customColor = require("../constants/Color");
import { useSelector } from "react-redux";
const Tab = createBottomTabNavigator();

export default function Main() {
    const token = useSelector((state) => state.token);
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: customColor.dark
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <Icon
                            name="home"
                            style={{ position: "relative" }}
                            color={color}
                            size={30}
                        />
                    )
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="map-marker-alt" color={color} size={30} />
                    )
                }}
            />
            {token.isVendor === true ? (
                <Tab.Screen
                    name="AddItem"
                    component={AddProductNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon name="plus-circle" color={color} size={30} />
                        )
                    }}
                />
            ) : null}
            <Tab.Screen
                name="Chat"
                component={ContactNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <MaterialCommunityIcons name="playlist-check" color={color} size={30} />
                            {/* <CartIcon /> */}
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileNavigator}
                options={{
                    tabBarIcon: ({ color }) => <Icon name="user" color={color} size={30} />
                }}
            />
        </Tab.Navigator>
    );
}
