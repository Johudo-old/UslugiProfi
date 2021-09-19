import { PopupTypeEnum } from "../../popups/Popup/PopupTypeEnum";
import { PopupActionsEnum } from "../actions/PopupActions";

export const PopupActionCreator = {
    openPopup: openPopupActionCreate,
    closePopup: closePopupActionCreate,
};

function openPopupActionCreate(name: PopupTypeEnum) {
    return {
        type: PopupActionsEnum.OPEN_POPUP,
        data: { name: name },
    };
}

function closePopupActionCreate() {
    return {
        type: PopupActionsEnum.CLOSE_POPUP,
        data: {},
    };
}
