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
import {FixedFinancialReport} from "./actionsOnFinancialReport/FixedFinancialReport";

export const FinancialReports = () => {

    const financialReport = useSelector(getFinancialReportSelector)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getFinancialReport())
    }, [])

    return <div className={style.financialReport}>


        <div className={style.FinancialReportList}>
            FinancialReport:
            {
                financialReport.map((fr: FinancialReportType) => <FinancialReport key={fr.id} financialReport={fr}/>)
            }
        </div>

        <div className={style.financialReportComponent}>
            <h3>Додати новий звіт:</h3>
            <AddFinancialReport/>
        </div>

        <div className={style.financialReportComponent}>
            <h3>Змінити звіт:</h3>
            <ChangeFinancialReport/>
        </div>

        <div className={style.financialReportComponent}>
            <h3>Видалити звіт:</h3>
            <DeleteFinancialReport/>
        </div>

        <div className={style.financialReportComponent}>
            <h3>Зафіксувати звіт:</h3>
            <FixedFinancialReport/>
        </div>
    </div>
}