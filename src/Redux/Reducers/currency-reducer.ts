import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "../redux-store";
import {CurrencyType} from "../Types/types";
import {CurrencyApi} from "../../Api/Api";

let initialState = {
    currency: [] as Array<CurrencyType>
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const currencyPageReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'SET_CURRENCY':
            return {...state, currency: action.currency}
        default:
            return state;
    }
}

export const actions = {
    setCurrency: (currency: Array<CurrencyType>) =>
        ({type: 'SET_CURRENCY', currency} as const)
}

export const getCurrency = (): ThunkType => async (dispatch) => {
    let data = await CurrencyApi.getCurrency();
    dispatch(actions.setCurrency(data));
}