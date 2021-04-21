import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import AuthReducer from "./reducers/AuthReducer";
// const reducers = combineReducers({ AuthReducer });

const store = createStore(AuthReducer, applyMiddleware(thunkMiddleware));

export default store;
