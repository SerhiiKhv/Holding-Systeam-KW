import {EnterpriseType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "../redux-store";
import {EnterpriseApi} from "../../Api/Api";


let initialState = {
    enterprise: [] as Array<EnterpriseType>
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const enterprisePageReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'SET_ENTERPRISE':
            return {...state, enterprise: action.enterprise}
        default:
            return state;
    }
}

export const actions = {
    setEnterprise: (enterprise: Array<EnterpriseType>) =>
        ({type: 'SET_ENTERPRISE', enterprise} as const)
}

export const getEnterprise = (): ThunkType => async (dispatch) => {
    let data = await EnterpriseApi.getEntries();
    dispatch(actions.setEnterprise(data));
}

export const addEnterprise = (name: string, profit: number, dateOfCreation: string):
    ThunkType => async (dispatch) => {
    await EnterpriseApi.postEnterprise(name, profit, dateOfCreation);
    await dispatch(getEnterprise());
};

export const changeEnterprise = (id: number, name: string, profit: number, dateOfCreation: string):
    ThunkType => async (dispatch) => {
    await EnterpriseApi.putEnterprise(id, name, profit, dateOfCreation);
    await dispatch(getEnterprise());
};

export const destroyEnterprise = (id: number):
    ThunkType => async (dispatch) => {
    await EnterpriseApi.deleteEnterprise(id);
    await dispatch(getEnterprise());
};