import {AppStateType} from "../redux-store";

export const getEnterprise = (state: AppStateType) => {
    return state.enterprise.enterprise;
}