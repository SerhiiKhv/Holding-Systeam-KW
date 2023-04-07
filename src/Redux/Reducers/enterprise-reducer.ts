import {EnterpriseType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "../redux-store";
import {EnterpriseApi} from "../../Api/Api";


let initialState = {
    enterprise:  [] as Array<EnterpriseType>
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const enterprisePageReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'ADD_ENTERPRISE':
            return {
                ...state,
                /*enterprise: [...state.enterprise, action.enterprise]*/
            }
        case 'SET_ENTERPRISE':
            return {
                ...state,
                enterprise: [action.enterprise]
            }
        default:
            return state;
    }
}

export const actions = {
    setEnterprise: (enterprise: EnterpriseType) => ({type: 'SET_ENTERPRISE', enterprise} as const),
    addEnterprise: (enterprise: EnterpriseType) => ({type: 'ADD_ENTERPRISE', enterprise} as const),
}

export const getEnterprise = ():ThunkType => async (dispatch) => {
    let data = await EnterpriseApi.getEntries();
    dispatch(actions.setEnterprise(data));
}






export const addEnterprise = (enterprise: EnterpriseType): ThunkType => async (dispatch) => {
    //const enterprises = [...initialState.enterprise, enterprise];
    //localStorage.setItem('Enterprises', JSON.stringify({enterprise: enterprises}));
    //dispatch(actions.addEnterprise(enterprise));
    //console.log(enterprises)
};
