import { ThunkDispatch } from "redux-thunk";
import { AuthAPI } from "../../api/AuthAPI";
import { UserAPI } from "../../api/UserAPI";
import { UserActionsEnum } from "../actions/UserActions";
import { IState } from "..";
import { Action } from "redux";
import Cookies from "js-cookie";

const loadUser = () => async (dispatch: ThunkDispatch<IState, void, Action>) => {
    try {
        const result = await UserAPI.getCurrenUserInfo();

        if (result.status === 200) {
            dispatch({
                type: UserActionsEnum.LOAD_USER_SUCCESS,
                payload: { user: result.data },
            });
        } else {
            dispatch({
                type: UserActionsEnum.LOAD_USER_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: UserActionsEnum.LOAD_USER_FAIL,
        });
    }
};

const refresh = () => async (dispatch: ThunkDispatch<IState, void, Action>) => {
    try {
        const result = await AuthAPI.refreshToken();

        if (result.status === 200) {
            dispatch({
                type: UserActionsEnum.REFRESH_SUCCESS,
            });

            await dispatch(loadUser());
        } else {
            dispatch({
                type: UserActionsEnum.REFRESH_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: UserActionsEnum.REFRESH_FAIL,
        });
    }
};

const register = (email: string, password: string) => async (dispatch: ThunkDispatch<IState, void, Action>) => {
    dispatch({
        type: UserActionsEnum.SET_AUTH_LOADING,
    });

    try {
        const result = await AuthAPI.register({ email, password });

        if (result.status === 201) {
            dispatch({
                type: UserActionsEnum.REGISTER_SUCCESS,
            });
        } else {
            dispatch({
                type: UserActionsEnum.REGISTER_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: UserActionsEnum.REGISTER_FAIL,
        });
    }

    dispatch({
        type: UserActionsEnum.REMOVE_AUTH_LOADING,
    });
};

const resetRegisterSuccess = () => (dispatch: ThunkDispatch<IState, void, Action>) => {
    dispatch({
        type: UserActionsEnum.RESET_REGISTER_SUCCESS,
    });
};

const login = (email: string, password: string) => async (dispatch: ThunkDispatch<IState, void, Action>) => {
    dispatch({
        type: UserActionsEnum.SET_AUTH_LOADING,
    });

    try {
        const result = await AuthAPI.login({ email, password });

        if (result.status === 200) {
            dispatch({
                type: UserActionsEnum.LOGIN_SUCCESS,
            });
            await dispatch(loadUser());
        } else {
            dispatch({
                type: UserActionsEnum.LOGIN_FAIL,
            });
        }
    } catch (err) {
        dispatch({
            type: UserActionsEnum.LOGIN_FAIL,
        });
    }

    dispatch({
        type: UserActionsEnum.REMOVE_AUTH_LOADING,
    });
};

const logout = () => async () => {
    const result = await AuthAPI.logout();

    if (result.status === 200) {
        Cookies.remove("access");
        Cookies.remove("refresh");
        window.location.reload();
        return;
    }

    alert("Error logout");
};

export const UserActionCreator = {
    login,
    logout,
    register,
    refresh,
    loadUser,
    resetRegisterSuccess,
};
