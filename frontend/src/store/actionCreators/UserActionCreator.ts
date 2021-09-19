import { User } from "../../types/User";
import { UserActionsEnum } from "../actions/UserActions";

export const UserActionCreator = {
    setUserInfo: setUserInfo,
};

function setUserInfo(user: User) {
    return {
        type: UserActionsEnum.SET_USER_INFO,
        data: { user: user },
    };
}
