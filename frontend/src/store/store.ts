import { createStore, applyMiddleware, Store } from "redux";
import thunk from "redux-thunk";
import { initialState, rootReducer } from "./rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () => {
    return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
};

export type AppStore = ReturnType<typeof makeStore>;
export const wrapper = createWrapper<AppStore>(makeStore);
