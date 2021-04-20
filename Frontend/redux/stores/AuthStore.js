import React, { useEffect, useReducer, useState } from "react";
import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthReducer from "../reducers/AuthReducer";
import { setCurrentVendor } from "../actions/AuthAction";
import AuthContext from "./AuthContext";

export default function AuthVendor(props) {
    const initialState = {
        isAuthenticated: null,
        vendor: null
    };
    const [state, dispatch] = useReducer(AuthReducer, initialState);
    const [showChild, setShowChild] = useState(false);
    useEffect(() => {
        setShowChild(true);
        if (AsyncStorage.jwt) {
            const decoded = AsyncStorage.jwt ? AsyncStorage.jwt : "";
            if (setShowChild) {
                dispatch(setCurrentVendor(jwt_decode(decoded)));
            }
        }
        return () => setShowChild(false);
    }, []);
    if (!showChild) {
        return null;
    } else {
        return (
            <AuthContext.Provider
                value={{
                    state,
                    dispatch
                }}
            >
                {props.children}
            </AuthContext.Provider>
        );
    }
}
