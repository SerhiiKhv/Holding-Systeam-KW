import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {changeEnterprise, getEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";
import {Field, Formik} from "formik";
import style from "../../Company/Company.module.css";
import {getFinancialReportSelector} from "../../../../Redux/selector/financialReport-selector";
import {changeFinancialReport} from "../../../../Redux/Reducers/financialReport-reducer";
import {getEnterpriseSelector} from "../../../../Redux/selector/enterprise-selector";

export const FixedFinancialReport = () => {
    const financialReport = useSelector(getFinancialReportSelector)
    const enterprise = useSelector(getEnterpriseSelector)
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [profit, setProfit] = useState(0)
    const [dateOfStart, setDateOfStart] = useState('')
    const [dateOfEnd, setDateOfEnd] = useState('')
    const [id, setId] = useState(0)

    const [idEnterprise, setIdEnterprise] = useState(0)
    const [nameEnterprise, setNameEnterprise] = useState('')
    const [profitEnterprise, setProfitEnterprise] = useState(0)
    const [dateOfCreation, setDateOfCreation] = useState('')

    useEffect(() => {
        dispatch(getEnterprise());
    }, []);
    const submit = () => {
        dispatch(changeFinancialReport(id, name, profit,
            dateOfStart, dateOfEnd, 'true'));

        dispatch(changeEnterprise(idEnterprise, nameEnterprise,
            profitEnterprise, dateOfCreation));

        setName('');
        setProfit(0);
        setDateOfStart('');
        setDateOfEnd('');

    };

    const onNameChange = (e: any) => {
        const selectedId = e.currentTarget.value;

        const selectedFinancialReport = financialReport.find(d => d.id == selectedId);

        if (selectedFinancialReport) {
            setName(selectedFinancialReport.name);
            setProfit(selectedFinancialReport.profit);
            setDateOfStart(selectedFinancialReport.dateOfStart);
            setDateOfEnd(selectedFinancialReport.dateOfEnd);
            setId(selectedId)

            const selectedEnterprise = enterprise.find(d => d.name === selectedFinancialReport.name);
            console.log(selectedEnterprise)
            if (selectedEnterprise) {
                let newProfitEnterprise = selectedEnterprise.profit + selectedFinancialReport.profit;
                setNameEnterprise(selectedEnterprise.name);
                setProfitEnterprise(newProfitEnterprise);
                setDateOfCreation(selectedEnterprise.dateOfCreation);
                setIdEnterprise(selectedEnterprise.id)
            }
        }

    }

    let optionElement = financialReport
        .filter(d => d.isFixed === 'false')
        .map(d => <option key={d.id}
                          value={d.id}>{d.name}</option>);

    return (
        <div>
            <Formik
                initialValues={{
                    name: "", profit: 0,
                    dateOfStart: "",
                    dateOfEnd: ""
                }}
                onSubmit={submit}
            >
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            value={name} onChange={onNameChange}
                            name="name" as="select" className={style.inputField}>
                            {optionElement}
                        </Field>

                        <div>
                            Назва компанії: {name}
                        </div>
                        <div>
                            Прибуток: {profit}
                        </div>
                        <div>
                            Початок кварталу: {dateOfStart}
                        </div>
                        <div>
                            Кінець кварталу:{dateOfEnd}
                        </div>

                        <button type="submit" className={style.button}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};