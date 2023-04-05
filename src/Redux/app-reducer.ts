const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

let initialState = {
    initialized: false
}
type InitialState = typeof initialState;
type ActionsTypes = InitializedSuccessActionType

export const appReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type){
        case INITIALIZED_SUCCESS:
           return{
               ...state,
               initialized: true
           }
        default:
            return state;
    }
}

type InitializedSuccessActionType = {
    type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = (): InitializedSuccessActionType => ({type: INITIALIZED_SUCCESS})