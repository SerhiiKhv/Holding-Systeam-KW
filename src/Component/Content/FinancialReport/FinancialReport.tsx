import {FinancialReportType} from "../../../Redux/Types/types";
import React from "react";

type MapStateToProps = {
    financialReport: FinancialReportType
}
export const FinancialReport: React.FC<MapStateToProps> = ({financialReport}) => {

    return <div>
        <div>
            {financialReport.name}
        </div>
        <div>
            {financialReport.profit}
        </div>
        <div>
            {financialReport.dateOfStart}
        </div>
        <div>
            {financialReport.dateOfEnd}
        </div>
        <div>
            {financialReport.isFixed}
        </div>
    </div>
}