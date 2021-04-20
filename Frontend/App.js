import React from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./navigators/Main";
import RootStackScreen from "./navigators/RootStackScreen";

import { Provider } from "react-redux";
import store from "./redux/store";

LogBox.ignoreAllLogs(true);
export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <Main />
            </NavigationContainer>
        </Provider>
    );
}
