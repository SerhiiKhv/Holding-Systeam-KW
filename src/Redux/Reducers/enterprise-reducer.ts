import initialState from '.././DateJSON/Enterprises.json';

type InitialState = typeof initialState;

export const enterprisePageReducer = (state = initialState): InitialState => {
    return state;
}