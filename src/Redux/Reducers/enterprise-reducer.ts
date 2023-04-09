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
        case 'ADD_ENTERPRISE':
            return {...state, enterprise: [...state.enterprise, action.enterprise]}
        default:
            return state;
    }
}

export const actions = {
    setEnterprise: (enterprise: Array<EnterpriseType>) =>
        ({type: 'SET_ENTERPRISE', enterprise} as const),
    addEnterpriseAction: (enterprise: EnterpriseType) =>
        ({type: 'ADD_ENTERPRISE', enterprise} as const)

}

export const getEnterprise = (): ThunkType => async (dispatch) => {
    let data = await EnterpriseApi.getEntries();
    dispatch(actions.setEnterprise(data));
}

export const addEnterprise = (name: string, profit: number, dateOfCreation: string):
    ThunkType => async (dispatch) => {
    //let enterprise = {name, profit, dateOfCreation}
    //dispatch(actions.addEnterpriseAction(enterprise))
    await EnterpriseApi.postEnterprise(name, profit, dateOfCreation);
    await dispatch(getEnterprise());
};
