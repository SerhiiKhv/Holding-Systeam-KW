import {useDispatch, useSelector} from "react-redux";
import {getEnterpriseSelector} from "../../../Redux/selector/enterprise-selector";
import React, {useEffect} from "react";
import {Enterprise} from "./Enterprise";
import style from "./Enterprise.module.css";
import {AddEnterprise} from "./actionsOnEnterprise/AddEnterprise";
import {getEnterprise} from "../../../Redux/Reducers/enterprise-reducer";
import {ChangeEnterprise} from "./actionsOnEnterprise/changeEnterprise";
import {DeleteEnterprise} from "./actionsOnEnterprise/DeleteEnterprice";

export const Enterprises = () => {
    const dispatch = useDispatch();
    const enterprise = useSelector(getEnterpriseSelector)

    useEffect(() => {
        dispatch(getEnterprise());
    }, []);

    return <div className={style.enterprise}>

        <div className={style.enterprisesList}>
            Enterprise:
            {
                enterprise.map((ent: any) => <Enterprise key={ent.id} enterprise={ent}/>)
            }
        </div>

        <div className={style.enterprisesComponent}>
            <h3>Додати нове підприємство:</h3>
            <AddEnterprise/>
        </div>

        <div className={style.enterprisesComponent}>
            <h3>Змінити дані існуючого підприємства:</h3>
            <ChangeEnterprise/>
        </div>

        <div className={style.enterprisesComponent}>
            <h3>Видалити існуюче підприємства:</h3>
            <DeleteEnterprise/>
        </div>
    </div>
}