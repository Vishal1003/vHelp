import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./navigators/Main";
LogBox.ignoreAllLogs(true);
export default function App() {
    return (
        <NavigationContainer>
            <Main />
        </NavigationContainer>
    );
}
