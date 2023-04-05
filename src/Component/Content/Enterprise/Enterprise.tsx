import React from "react";
import {EnterpriseType} from "../../../Redux/Types/types";
import style from "./Enterprise.module.css";

type MapStateToProps = {
    enterprise: EnterpriseType
}
export const Enterprise: React.FC<MapStateToProps> = ({enterprise}) => {
    return <div className={style.enterprises}>
        <div>
            Назва: {enterprise.name}
        </div>
        <div>
            Прибуток: {enterprise.profit}
        </div>
        <div>
            Дата засновання: {enterprise.dateOfCreation}
        </div>
    </div>
}