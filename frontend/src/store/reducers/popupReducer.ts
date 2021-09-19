import { PopupActionsEnum } from "../actions/PopupActions";
import { defaultPopupState, PopupState } from "../states/popupState";

export default function popupReducer(
    state: PopupState = defaultPopupState,
    action: {
        type: PopupActionsEnum;
        data: any;
    }
): PopupState {
    switch (action.type) {
        case PopupActionsEnum.OPEN_POPUP:
            return { ...state, isOpen: true, name: action.data.name };

        case PopupActionsEnum.CLOSE_POPUP:
            return { ...state, isOpen: false, name: null };

        default:
            return state;
    }
}
