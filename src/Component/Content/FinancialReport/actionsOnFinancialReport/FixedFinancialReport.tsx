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
    const [dateOfStart, setDateOfStart] = useState('11.11.1111')
    const [dateOfEnd, setDateOfEnd] = useState('11.11.1111')
    const [id, setId] = useState(0)

    const [idEnterprise, setIdEnterprise] = useState(0)
    const [nameEnterprise, setNameEnterprise] = useState('')
    const [profitEnterprise, setProfitEnterprise] = useState(0)
    const [dateOfCreation, setDateOfCreation] = useState('11.11.1111')

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
        setDateOfStart('11.11.1111');
        setDateOfEnd('11.11.1111');

    };

    const onNameChange = (e: any) => {
        const selectedName = e.currentTarget.value;
        setName(selectedName);

        const selectedFinancialReport = financialReport.find(d => d.name === selectedName);
        const selectedEnterprise = enterprise.find(d => d.name === selectedName);
        if (selectedFinancialReport) {
            setProfit(selectedFinancialReport.profit);
            setDateOfStart(selectedFinancialReport.dateOfStart);
            setDateOfEnd(selectedFinancialReport.dateOfEnd);
            setId(selectedFinancialReport.id)
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
        .filter((d) => d.isFixed === 'false')
        .map(d => <option key={d.id}
                                                                                              value={d.name}>{d.name}</option>);

    return (
        <div>
            <Formik
                initialValues={{
                    name: "", profit: 0,
                    dateOfStart: "11.11.1111",
                    dateOfEnd: "11.11.1111"
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