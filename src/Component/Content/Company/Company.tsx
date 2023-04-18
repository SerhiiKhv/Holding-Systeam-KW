import {CompanyType} from "../../../Redux/Types/types";
import React from "react";
import style from "./Company.module.css";

type MapStateToProps = {
    company: CompanyType
}
export const Company: React.FC<MapStateToProps> = ({company}) => {

    const listEnterprises = company.enterprises.map((enterprises ) =>
        <li>{enterprises}</li>
    );

    return <div className={style.company}>
        <div>
            {company.name}
        </div>
       <div>
           {listEnterprises}
       </div>
    </div>
}