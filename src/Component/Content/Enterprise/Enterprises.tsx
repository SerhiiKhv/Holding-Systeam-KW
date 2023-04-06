import {useSelector} from "react-redux";
import {getEnterprise} from "../../../Redux/selector/enterprise-selector";
import React from "react";
import {Enterprise} from "./Enterprise";
import style from "./Enterprise.module.css";
import {AddEnterprise} from "./AddEnterprise";

export const Enterprises = () => {
    const enterprise = useSelector(getEnterprise)

    return <div className={style.enterprise}>
        Enterprise:

        <div>
            {
                enterprise.map((ent: any) => <Enterprise enterprise={ent}/>)
            }
        </div>


        <div>
            <AddEnterprise/>
        </div>
    </div>
}