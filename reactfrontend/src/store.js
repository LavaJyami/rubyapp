import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import WBReducer from "./Reducers/reducer";

export default createStore(WBReducer, applyMiddleware(thunk));
