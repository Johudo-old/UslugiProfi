import { Context, createWrapper } from "next-redux-wrapper";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { initialState, rootReducer } from "./rootReducer";

// REDUX DEV TOOLS
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = (typeof window != "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// END REDUX DEV TOOLS

const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk)));

const makeStore = (context: Context) => store;

export const wrapper = createWrapper(makeStore);
export default store;
