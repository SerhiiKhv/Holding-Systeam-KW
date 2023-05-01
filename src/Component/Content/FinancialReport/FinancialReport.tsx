import {FinancialReportType} from "../../../Redux/Types/types";
import React from "react";
import style from "./FinancialReport.module.css"

type MapStateToProps = {
    financialReport: FinancialReportType
}
export const FinancialReport: React.FC<MapStateToProps> = ({financialReport}) => {

    return <div className={style.financialReports}>
        <div>
            Назва компанії: {financialReport.name}
        </div>
        <div>
            Прибуток: {financialReport.profit}
        </div>
        <div>
            Початок кварталу: {financialReport.dateOfStart}
        </div>
        <div>
            Кінець кварталу: {financialReport.dateOfEnd}
        </div>
        <div>
            Звіт зафіксовано: {financialReport.isFixed}
        </div>
    </div>
}