import {AppStateType} from "../redux-store";

export const getCurrencySelector = (state: AppStateType) => {
    return state.currency.currency
}