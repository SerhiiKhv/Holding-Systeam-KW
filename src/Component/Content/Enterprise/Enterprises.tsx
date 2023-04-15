import {useDispatch, useSelector} from "react-redux";
import {getEnterpriseSelector} from "../../../Redux/selector/enterprise-selector";
import React, {useEffect} from "react";
import {Enterprise} from "./Enterprise";
import style from "./Enterprise.module.css";
import {AddEnterprise} from "./actionsOnEnterprise/AddEnterprise";
import {getEnterprise} from "../../../Redux/Reducers/enterprise-reducer";
import {ChangeEnterprise} from "./actionsOnEnterprise/changeEnterprise";

export const Enterprises = () => {
    const dispatch = useDispatch();
    const enterprise = useSelector(getEnterpriseSelector)

    useEffect(() => {
        dispatch(getEnterprise());
    }, []);

    return <div className={style.enterprise}>
        Enterprise:

        <div className={style.enterprisesList}>
            {
                enterprise.map((ent: any) => <Enterprise key={ent.id} enterprise={ent}/>)
            }
        </div>

        <div>
            <h3>Додати нове підприємство:</h3>
            <AddEnterprise/>
        </div>

        <div>
            <h3>Змінити дані існуючого підприємства:</h3>
            <ChangeEnterprise/>
        </div>
    </div>
}