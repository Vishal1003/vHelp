import React, { useEffect, useState } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Main from "./navigators/Main";
import RootStackScreen from "./navigators/RootStackScreen";

import { Provider } from "react-redux";
import store from "./redux/store";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REST_API_URL } from "./constants/URLs";

LogBox.ignoreAllLogs(true);
export default function App() {
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("jwt");
            const config = {
                headers: {
                    "x-access-token": token
                }
            };

            axios
                .post(`${REST_API_URL}/api/index/verify`, config)
                .then((response) => {
                    if (response.data.success === true) setIsAuth(true);
                })
                .catch((err) => console.log(err));
        })();
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>{isAuth ? <Main /> : <RootStackScreen />}</NavigationContainer>
        </Provider>
    );
}
