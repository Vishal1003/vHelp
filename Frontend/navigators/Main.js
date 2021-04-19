import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

// Stacks
import HomeNavigator from "./HomeNavigator";
import AddProductNavigator from "./AddProductNavigator";
import ProfileNavigator from "./ProfileNavigator";
import MapNavigator from "./MapNavigator";
// import VendorNavigator from "./VendorNavigator";
const customColor = require("../constants/Color");

const Tab = createBottomTabNavigator();

export default function Main() {
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
            {/* {context.stateUser.user.isVendor == true ? ( */}
            {true ? (
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
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <View>
                            <Icon name="wechat" color={color} size={30} />
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
