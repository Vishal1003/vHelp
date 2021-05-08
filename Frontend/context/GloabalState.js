import React, { useState, useReducer } from "react";
import ThemeContext from "./ThemeContext";
import { themeReducer, TOGGLE_THEME } from "./reducers";

const GlobalState = (props) => {
    const initialState = {
        light: {
            foreground: "#000000",
            background: "#eeeeee"
        },
        dark: {
            foreground: "#ffffff",
            background: "#000000"
        },
        current_theme: "light"
    };
    const [state, dispatch] = useReducer(themeReducer, initialState);
    const toggleTheme = () => {
        dispatch({ type: TOGGLE_THEME });
    };
    return (
        <ThemeContext.Provider
            value={{
                ...state,
                toggleTheme: toggleTheme
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export default GlobalState;
