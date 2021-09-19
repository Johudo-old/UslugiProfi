import { UserActionsEnum } from "../actions/UserActions";
import { defaultUserState, UserState } from "../states/UserState";

export default function userReducer(
    state: UserState = defaultUserState,
    action: {
        type: UserActionsEnum;
        data: any;
    }
) {
    switch (action.type) {
        case UserActionsEnum.SET_USER_INFO:
            return { ...state, ...action.data.user };

        default:
            return state;
    }
}
