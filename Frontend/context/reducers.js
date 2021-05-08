export const TOGGLE_THEME = "TOGGLE_THEME";
const toggleTheme = (state) => {
    if (state.current_theme === "dark") {
        return { ...state, current_theme: "light" };
    } else {
        return { ...state, current_theme: "dark" };
    }
};
export const themeReducer = (state, action) => {
    switch (action.type) {
        case TOGGLE_THEME:
            return toggleTheme(state);
        default:
            return state;
    }
};
