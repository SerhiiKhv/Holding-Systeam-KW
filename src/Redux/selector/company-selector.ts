import {AppStateType} from "../redux-store";

export const getCompanySelector = (state: AppStateType) => {
    return state.company.company
}