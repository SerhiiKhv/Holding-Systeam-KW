import {AddCompanys} from "./actionsOnCompany/AddCompany";
import {ChangeCompanys} from "./actionsOnCompany/ChangeCompany";
import {DeleteCompanys} from "./actionsOnCompany/DeleteCompany";
import {useDispatch, useSelector} from "react-redux";
import {getCompanySelector} from "../../../Redux/selector/company-selector";
import {CompanyType} from "../../../Redux/Types/types";
import {Company} from "./Company";
import {useEffect} from "react";
import {getCompany} from "../../../Redux/Reducers/company-reducer";
import style from "./Company.module.css"

export const Companys = () => {

    const company = useSelector(getCompanySelector)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getCompany())
    }, [])

    return <div className={style.companys}>
        <div>
            {
                company.map((com: CompanyType) => <Company key={com.id} company={com}/>)
            }
        </div>

        <div>
            <AddCompanys/>
        </div>

        <div>
            <ChangeCompanys/>
        </div>

        <div>
            <DeleteCompanys/>
        </div>
    </div>
}