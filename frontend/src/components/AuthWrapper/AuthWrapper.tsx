import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { UserActionCreator } from "../../store/actionCreators/UserActionCreator";
import { AuthWrapperProps } from "./AuthWrapperProps";

export default function AuthWrapper(props: AuthWrapperProps) {
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(UserActionCreator.refresh());
    // }, []);

    return <>{props.children}</>;
}
