import React from "react";

export default React.createContext({
    light: {
        foreground: "#000000",
        background: "#eeeeee"
    },
    dark: {
        foreground: "#ffffff",
        background: "#222222"
    },
    current_theme: "light",
    toggleTheme: () => {}
});
