import {AddCompanys} from "./actionsOnCompany/AddCompany";
import {ChangeCompanys} from "./actionsOnCompany/ChangeCompany";
import {DeleteCompanys} from "./actionsOnCompany/DeleteCompany";
import {useDispatch, useSelector} from "react-redux";
import {getCompanySelector} from "../../../Redux/selector/company-selector";
import {CompanyType} from "../../../Redux/Types/types";
import {Company} from "./Company";
import React, {useEffect} from "react";
import {getCompany} from "../../../Redux/Reducers/company-reducer";
import style from "./Company.module.css"

export const Companys = () => {

    const company = useSelector(getCompanySelector)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompany())
    }, [])

    return <div className={style.companys}>
        Companys:
        <div className={style.CompanyList}>
            {
                company.map((com: CompanyType) => <Company key={com.id} company={com}/>)
            }
        </div>

        <div>
            <h3>Додати нову компанію:</h3>
            <AddCompanys/>
        </div>

        <div>
            <h3>Змінити дані існуючої компанії:</h3>
            <ChangeCompanys/>
        </div>

        <div>
            <h3>Видалити існуючу компанію:</h3>
            <DeleteCompanys/>
        </div>
    </div>
}