import { combineReducers } from "redux";
import popupReducer from "./reducers/popupReducer";
import userReducer from "./reducers/userReducer";
import { defaultPopupState, PopupState } from "./states/popupState";
import { defaultUserState, UserState } from "./states/UserState";

export interface IState {
    popup: PopupState;
    user: UserState;
}

export const initialState: IState = {
    popup: defaultPopupState,
    user: defaultUserState,
};

export const rootReducer = combineReducers({
    popup: popupReducer,
    user: userReducer,
});
