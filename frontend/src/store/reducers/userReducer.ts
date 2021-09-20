import { UserActionsEnum } from "../actions/UserActions";
import { defaultUserState, UserState } from "../states/UserState";

export default function userReducer(
    state: UserState = defaultUserState,
    action: {
        type: UserActionsEnum;
        payload?: any;
    }
) {
    switch (action.type) {
        case UserActionsEnum.SET_USER_INFO:
            return { ...state, ...action.payload.user };

        default:
            return state;
    }
}
