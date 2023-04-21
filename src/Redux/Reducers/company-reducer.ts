import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "../redux-store";
import {CompanyApi} from "../../Api/Api";
import {CompanyType} from "../Types/types";

let initialState = {
    company: [] as Array<CompanyType>
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const companyPageReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'SET_COMPANY':
            return {...state, company: action.company}
        default:
            return state;
    }
}

export const actions = {
    setCompany: (company: Array<CompanyType>) =>
        ({type: 'SET_COMPANY', company} as const)
}

export const getCompany = (): ThunkType => async (dispatch) => {
    let data = await CompanyApi.getCompany();
    dispatch(actions.setCompany(data));
}

export const addCompany = (name: string, enterprises: Array<string>):
    ThunkType => async (dispatch) => {
    await CompanyApi.postCompany(name, enterprises);
    await dispatch(getCompany());
};

export const changeCompany = (id: number, name: string, enterprises: Array<string>):
    ThunkType => async (dispatch) => {
    await CompanyApi.putCompany(id, name, enterprises);
    await dispatch(getCompany());
};

export const destroyCompany = (id: number):
    ThunkType => async (dispatch) => {
    await CompanyApi.deleteCompany(id);
    await dispatch(getCompany());
};