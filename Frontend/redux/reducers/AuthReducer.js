import ACTION_TYPES from "../actions/actionTypes";
import MESSAGES from "../../constants/Messages";
const initialState = {
    token: {},
    user_data: {},
    error_message: "",
    success_message: "",
    is_authenticated: false
};
export default function AuthReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.REGISTER_CURRENT_USER:
            return { ...initialState, success_message: MESSAGES.REGISTERED_SUCCESSFULLY };
        case ACTION_TYPES.LOGIN_CURRENT_USER:
            return {
                is_authenticated: true,
                user_data: action.user_data,
                token: action.token,
                error_message: "",
                success_message: MESSAGES.LOGGEDIN_SUCCESSFULLY
            };
        case ACTION_TYPES.SET_ERROR_MESSAGE:
            return {
                ...state,
                success_message: "",
                error_message: action.error_message
            };
        case ACTION_TYPES.LOGOUT_CURRENT_USER:
            return { ...initialState, success_message: MESSAGES.LOGGEDOUT_SUCCESSFULLY };
        default:
            return state;
    }
}
