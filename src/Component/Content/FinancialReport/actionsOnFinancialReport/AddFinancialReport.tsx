import {useDispatch, useSelector} from "react-redux";
import {getEnterpriseSelector} from "../../../../Redux/selector/enterprise-selector";
import React, {useEffect} from "react";
import {getEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";
import {Field, Formik} from "formik";
import style from "../FinancialReport.module.css";
import {addFinancialReport} from "../../../../Redux/Reducers/financialReport-reducer";

export const AddFinancialReport = () => {
    const enterprise = useSelector(getEnterpriseSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnterprise());
    }, []);

    const submit = (values: { name: string,
        profit: number,
        dateOfStart: string,
        dateOfEnd: string,
    }) => {
        dispatch(addFinancialReport(values.name, values.profit,
            values.dateOfStart, values.dateOfEnd, 'false'));
        values.name = "";
        values.profit = 0;
        values.dateOfStart = '';
        values.dateOfEnd = '';
    };

    let optionElement = enterprise.map(d =>  <option key={d.id} value={d.name}>{d.name}</option>);

    return (
        <div>
            <Formik
                initialValues={{name: "", profit: 0,
                    dateOfStart: "",
                    dateOfEnd: ""}}
                onSubmit={submit}
            >
                {({values, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>

                        <Field
                            name="name" as="select" className={style.inputFieldOption}>
                            <option key="default" value="">Виберіть підприємство:</option>
                            {optionElement}
                        </Field>

                        <Field
                            type="number"
                            name="profit"
                            value={values.profit}
                            className={style.inputField}
                        />

                        <Field
                            type="date"
                            name="dateOfStart"
                            value={values.dateOfStart}
                            className={style.inputField}
                        />

                        <Field
                            type="date"
                            name="dateOfEnd"
                            value={values.dateOfEnd}
                            className={style.inputField}
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