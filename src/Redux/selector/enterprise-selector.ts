import {AppStateType} from "../redux-store";

export const getEnterpriseSelector = (state: AppStateType) => {
    return state.enterprise.enterprise;
}