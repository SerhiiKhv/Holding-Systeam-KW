import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {getEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";
import {Field, Formik} from "formik";
import style from "../../Company/Company.module.css";
import {getFinancialReportSelector} from "../../../../Redux/selector/financialReport-selector";
import {changeFinancialReport} from "../../../../Redux/Reducers/financialReport-reducer";

export const ChangeFinancialReport = () => {
    const financialReport = useSelector(getFinancialReportSelector)
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [profit, setProfit] = useState( 0 )
    const [dateOfStart, setDateOfStart] = useState( '11.11.1111' )
    const [dateOfEnd, setDateOfEnd] = useState( '11.11.1111' )
    const [id, setId] = useState(0)

    useEffect(() => {
        dispatch(getEnterprise());
    }, []);
    const submit = () => {
        dispatch(changeFinancialReport(id, name, profit,
            dateOfStart, dateOfEnd, 'false'));
        setName('');
        setProfit(0);
        setDateOfStart('11.11.1111');
        setDateOfEnd('11.11.1111');

    };

    const onNameChange = (e: any) => {
        const selectedName = e.currentTarget.value;
        setName(selectedName);

        const selectedFinancialReport = financialReport.find(d => d.name === selectedName);
        if (selectedFinancialReport) {
            setProfit(selectedFinancialReport.profit);
            setDateOfStart(selectedFinancialReport.dateOfStart);
            setDateOfEnd(selectedFinancialReport.dateOfEnd);
            setId(selectedFinancialReport.id)
        }
    }

    const onProfitChange = (e: any) => {
        setProfit(e.currentTarget.value);
    }

    const onDateOfStartChange = (e: any) => {
        setDateOfStart(e.currentTarget.value);
    }

    const onDateOfEndChange = (e: any) => {
        setDateOfEnd(e.currentTarget.value);
    }

    let optionElement = financialReport.map(d => <option key={d.id} value={d.name}>{d.name}</option>);

    return (
        <div>
            <Formik
                initialValues={{name: "", profit: 0,
                    dateOfStart: "11.11.1111",
                    dateOfEnd: "11.11.1111"}}
                onSubmit={submit}
            >
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            value={name} onChange={onNameChange}
                            name="name" as="select" className={style.inputField}>
                            {optionElement}
                        </Field>

                        <Field
                            type="number"
                            name="profit"
                            value={profit}
                            className={style.inputField}
                            onChange={onProfitChange}
                        />

                        <Field
                            type="text"
                            name="dateOfStart"
                            value={dateOfStart}
                            className={style.inputField}
                            onChange={onDateOfStartChange}
                        />

                        <Field
                            type="text"
                            name="dateOfEnd"
                            value={dateOfEnd}
                            className={style.inputField}
                            onChange={onDateOfEndChange}
                        />

                        <button type="submit" className={style.button}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};