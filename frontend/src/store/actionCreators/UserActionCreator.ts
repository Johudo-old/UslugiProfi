import { User } from "../../types/User";
import { UserActionsEnum } from "../actions/UserActions";

export const UserActionCreator = {
    setUserInfo,
};

function setUserInfo(user: User) {
    return {
        type: UserActionsEnum.SET_USER_INFO,
        payload: { user: user },
    };
}
