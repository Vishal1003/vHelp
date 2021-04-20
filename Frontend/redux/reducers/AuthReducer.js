import { SET_CURRENT_VENDOR } from "../actions/AuthAction";

const isNotValid = (value)=>{
    value === undefined || 
    value === null ||
    (typeof value === "object" && Object.keys(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0);
};

export default function AuthReducer(state, action) {
    switch (action.type) {
        case SET_CURRENT_VENDOR:
            return {
                ...state,
                isAuthenticated: !isNotValid(action.payload),
                vendor: action.payload,
                vendorProfile: action.vendorProfile
            };
        default:
            return state;
    }
}
