import {AppStateType} from "../redux-store";

export const getFinancialReportSelector = (state: AppStateType) => {
    return state.financialReport.financialReport;
}