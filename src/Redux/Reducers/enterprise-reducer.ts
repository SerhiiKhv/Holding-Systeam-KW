import {EnterpriseType} from "../Types/types";

let initialState = {
    enterprise: [
        {name: 'IT-pro', profit: 100, dateOfCreation: '10.10.2020'},
        {name: 'Unit', profit: 150, dateOfCreation: '10.10.2020'}
    ] as Array<EnterpriseType>
}

type InitialState = typeof initialState;

export const enterprisePageReducer = (state = initialState): InitialState => {
    return state;
}