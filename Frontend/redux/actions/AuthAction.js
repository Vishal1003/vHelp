import jwt_decode from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
// const { REST_API_URL } = require("../../constants/URLs");
const backendURL = `https://vhelp-rest.herokuapp.com`;
import axios from "axios";
const querystring = require("query-string");

export const SET_CURRENT_VENDOR = "SET_CURRENT_VENDOR";

export const setCurrentVendor = (decoded, vendor) => {
    return {
        type: SET_CURRENT_VENDOR,
        payload: decoded,
        vendorProfile: vendor
    };
};

export const logoutVendor = (dispatch) => {
    AsyncStorage.removeItem("jwt");
    dispatch(setCurrentVendor({}));
};

export const loginVendor = (vendor, dispatch) => {
    axios
        .post(
            `${backendURL}/api/vendor/login`,
            querystring.stringify({
                email: vendor.email,
                password: vendor.password
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }
        )
        .then((res) => {
            if (res.data.success === true) {
                const token = res.data.token;
                AsyncStorage.setItem("jwt", token);
                const decoded = jwt_decode(token);
                dispatch(setCurrentVendor(decoded, vendor));
            } else {
                logoutVendor(dispatch);
            }
        })
        .catch((err) => {
            console.log("API call error", err);
            logoutVendor(dispatch);
        });
};
