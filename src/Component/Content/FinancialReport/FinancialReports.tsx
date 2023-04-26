import {useDispatch, useSelector} from "react-redux";
import {getFinancialReportSelector} from "../../../Redux/selector/financialReport-selector";
import React, {useEffect} from "react";
import {getFinancialReport} from "../../../Redux/Reducers/financialReport-reducer";
import {FinancialReport} from "./FinancialReport";
import {FinancialReportType} from "../../../Redux/Types/types";
import style from "./FinancialReport.module.css";
import {AddFinancialReport} from "./actionsOnFinancialReport/AddFinancialReport";
import {ChangeFinancialReport} from "./actionsOnFinancialReport/ChangeFinancialReport";
import {DeleteFinancialReport} from "./actionsOnFinancialReport/DeleteFinancialReport";

export const FinancialReports = () => {

    const financialReport = useSelector(getFinancialReportSelector)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFinancialReport())
    }, [])

    return <div className={style.financialReport}>
        FinancialReport:

        <div className={style.FinancialReportList}>
            {
                financialReport.map((fr: FinancialReportType) => <FinancialReport key={fr.id} financialReport={fr}/>)
            }
        </div>

        <div>
            <AddFinancialReport/>
        </div>

        <div>
            <ChangeFinancialReport/>
        </div>

        <div>
            <DeleteFinancialReport/>
        </div>
    </div>
}