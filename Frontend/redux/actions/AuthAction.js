import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { REST_API_URL } from "../../constants/URLs";
import axios from "axios";
import ACTION_TYPES from "./actionTypes";
const querystring = require("query-string");

// For user and vendor both, isVendor in decoded token
export const loginCurrentUser = (decoded, user_data) => {
    return {
        type: ACTION_TYPES.LOGIN_CURRENT_USER,
        token: decoded,
        user_data: user_data
    };
};

export const setErrorMessage = (error_message) => {
    return {
        type: ACTION_TYPES.SET_ERROR_MESSAGE,
        error_message: error_message
    };
};

export const setSuccessMessage = (success_message) => {
    return {
        type: ACTION_TYPES.SET_SUCCESS_MESSAGE,
        success_message: success_message
    };
};

export const logoutCurrentUser = () => {
    return { type: ACTION_TYPES.LOGOUT_CURRENT_USER };
};

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(logoutCurrentUser());
};

export const registerCurrentUser = () => {
    return { type: ACTION_TYPES.REGISTER_CURRENT_USER };
};

export const registerUser = (user, dispatch) => {
    (async () => {
        const requestData = querystring.stringify({
            email: user.email,
            password: user.password,
            user_type: user.user_type
        });
        const requestConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        try {
            let res = await axios.post(
                `${REST_API_URL}/api/index/register`,
                requestData,
                requestConfig
            );
            res = res.data;
            if (res.success === true) {
                dispatch(registerCurrentUser());
            } else {
                dispatch(setErrorMessage(res.message));
            }
        } catch (err) {
            dispatch(setErrorMessage("Backend Error"));
            console.log("API call error", err);
        }
    })();
};

export const loginUser = (user, dispatch) => {
    (async () => {
        const requestData = querystring.stringify({
            email: user.email,
            password: user.password
        });
        const requestConfig = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        };
        try {
            let res = await axios.post(
                `${REST_API_URL}/api/index/login`,
                requestData,
                requestConfig
            );
            res = res.data;
            if (res.success === true) {
                const token = res.token;
                AsyncStorage.setItem("jwt", token);
                const decoded = jwt_decode(token);
                dispatch(loginCurrentUser(decoded, res.user));
            } else {
                dispatch(setErrorMessage(res.message));
            }
        } catch (err) {
            dispatch(setErrorMessage("Backend Error"));
            console.log("API call error", err);
        }
    })();
};
