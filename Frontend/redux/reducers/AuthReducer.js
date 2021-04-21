import { LOGIN_CURRENT_USER, LOGOUT_CURRENT_USER, SET_ERROR_MESSAGE } from "../actions/actionTypes";
const initialState = {
    token: {},
    user_data: {},
    error_message: "",
    is_authenticated: false
};
export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_CURRENT_USER:
            return {
                is_authenticated: true,
                user_data: action.user_data,
                token: action.token,
                error_message: ""
            };
        case SET_ERROR_MESSAGE:
            return {
                ...state,
                error_message: action.error_message
            };
        case LOGOUT_CURRENT_USER:
            return initialState;
        default:
            return state;
    }
}
