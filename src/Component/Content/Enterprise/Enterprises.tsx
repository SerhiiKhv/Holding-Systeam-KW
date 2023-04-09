import {useDispatch, useSelector} from "react-redux";
import {getEnterpriseSelector} from "../../../Redux/selector/enterprise-selector";
import React, {useEffect} from "react";
import {Enterprise} from "./Enterprise";
import style from "./Enterprise.module.css";
import {AddEnterprise} from "./AddEnterprise";
import {getEnterprise} from "../../../Redux/Reducers/enterprise-reducer";

export const Enterprises = () => {
    const dispatch = useDispatch();
    const enterprise = useSelector(getEnterpriseSelector)

    useEffect(() => {
        dispatch(getEnterprise());
    }, []);

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