import {FinancialReportType} from "../Types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsType} from "../redux-store";
import {FinancialReportApi} from "../../Api/Api";


let initialState = {
    financialReport: [] as Array<FinancialReportType>
}

type InitialState = typeof initialState;
type ActionsTypes = InferActionsType<typeof actions>;
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;

export const financialReportPageReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case 'SET_FINANCIAL_REPORT':
            return {...state, financialReport: action.financialReport}
        default:
            return state;
    }
}

export const actions = {
    setFinancialReport: (financialReport: Array<FinancialReportType>) =>
        ({type: 'SET_FINANCIAL_REPORT', financialReport} as const)
}

export const getFinancialReport = (): ThunkType => async (dispatch) => {
    let data = await FinancialReportApi.getFinancialReport();
    dispatch(actions.setFinancialReport(data));
}

export const addEnterprise = (name: string,
                              profit: number,
                              dateOfStart: string,
                              dateOfEnd: string,
                              isFixed: "true" | "false"):
    ThunkType => async (dispatch) => {
    await FinancialReportApi.postFinancialReport(
        name, profit, dateOfStart,
        dateOfEnd, isFixed);

    await dispatch(getFinancialReport());
};

export const changeFinancialReport = (id: number,
                                      name: string,
                                      profit: number,
                                      dateOfStart: string,
                                      dateOfEnd: string,
                                      isFixed: "true" | "false"):
    ThunkType => async (dispatch) => {
    await FinancialReportApi.putFinancialReport(
        id, name,
        profit, dateOfStart,
        dateOfEnd, isFixed);
    await dispatch(getFinancialReport());
};

export const destroyFinancialReport = (id: number):
    ThunkType => async (dispatch) => {
    await FinancialReportApi.deleteFinancialReport(id);
    await dispatch(getFinancialReport());
};