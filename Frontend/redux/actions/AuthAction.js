import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
const backendURL = `https://vhelp-rest.herokuapp.com`;
import axios from "axios";
import { LOGIN_CURRENT_USER, LOGOUT_CURRENT_USER, SET_ERROR_MESSAGE } from "./actionTypes";
const querystring = require("query-string");

// For user and vendor both, isVendor in decoded token
export const loginCurrentUser = (decoded, user_data) => {
    return {
        type: LOGIN_CURRENT_USER,
        token: decoded,
        user_data: user_data
    };
};

export const setErrorMessage = (error_message) => {
    return {
        type: SET_ERROR_MESSAGE,
        error_message: error_message
    };
};

export const logoutCurrentUser = () => {
    return { type: LOGOUT_CURRENT_USER };
};

export const logoutUser = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(logoutCurrentUser());
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
            // try login as a vendor
            let res = await axios.post(
                `${backendURL}/api/vendor/login`,
                requestData,
                requestConfig
            );
            res = res.data;
            if (res.success === true) {
                const token = res.token;
                AsyncStorage.setItem("jwt", token);
                const decoded = jwt_decode(token);
                dispatch(loginCurrentUser(decoded, res.vendor));
            } else {
                // try login as a user
                res = await axios.post(`${backendURL}/api/user/login`, requestData, requestConfig);
                res = res.data;
                if (res.success === true) {
                    const token = res.token;
                    AsyncStorage.setItem("jwt", token);
                    const decoded = jwt_decode(token);
                    dispatch(loginCurrentUser(decoded, res.user));
                } else {
                    dispatch(setErrorMessage(res.message));
                }
            }
        } catch (err) {
            dispatch(setErrorMessage("Backend Error"));
            console.log("API call error", err);
        }
    })();
};
