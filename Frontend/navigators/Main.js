import React from "react";
import { View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// Stacks
import HomeNavigator from "./HomeNavigator";
import ProfileNavigator from "./ProfileNavigator";
// import VendorNavigator from "./VendorNavigator";

const Tab = createBottomTabNavigator();

export default function Main() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                keyboardHidesTabBar: true,
                showLabel: false,
                activeTintColor: "#e91e63"
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
                name="Vendor"
                component={HomeNavigator}
                options={{
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="map-marker-alt" color={color} size={30} />
                    )
                }}
            />
            {/* {context.stateUser.user.isAdmin == true ? ( */}

            <Tab.Screen
                name="Cart"
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
            {true ? (
                <Tab.Screen
                    name="Profile"
                    component={ProfileNavigator}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Icon
                                name="user"
                                color={color}
                                size={30}
                            />
                        )
                    }}
                />
            ) : null}
        </Tab.Navigator>
    );
}
