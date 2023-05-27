import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {getEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";
import {Field, Formik} from "formik";
import style from "../FinancialReport.module.css";
import {getFinancialReportSelector} from "../../../../Redux/selector/financialReport-selector";
import {changeFinancialReport} from "../../../../Redux/Reducers/financialReport-reducer";
import {required} from "../../../../utils/validators/validators";

type SubmitType = {
    name: string,
    profit: number,
    id: number,
    dateOfStart: string,
    dateOfEnd: string
}

export const ChangeFinancialReport = () => {
    const financialReport = useSelector(getFinancialReportSelector)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnterprise());
    }, [dispatch]);
    const submit = (values: SubmitType) => {
        dispatch(changeFinancialReport(values.id, values.name, values.profit,
            values.dateOfStart, values.dateOfEnd, 'false'));

        values.name = ''
        values.profit = 0
        values.dateOfStart = ''
        values.dateOfEnd = ''
    };

    const onNameChange = (e: any, handleChange: any, setFieldValue: any) => {
        const selectedId = e.currentTarget.value;

        handleChange(e);

        const selectedFinancialReport = financialReport.find(d => d.id === +selectedId);
        if (selectedFinancialReport) {
            setFieldValue("profit", selectedFinancialReport.profit);
            setFieldValue("dateOfStart", selectedFinancialReport.dateOfStart);
            setFieldValue("dateOfEnd", selectedFinancialReport.dateOfEnd);
            setFieldValue("id", selectedFinancialReport.id);
            setFieldValue("name", selectedFinancialReport.name);
        }
    }

    let optionElement = financialReport.map(d => (
        <option key={d.id} value={d.id}>{d.name}</option>
    ));

    return (
        <div>
            <Formik
                initialValues={{
                    name: "",
                    profit: 0,
                    dateOfStart: "",
                    dateOfEnd: "",
                    id: 0}}
                onSubmit={submit}
            >
                {({handleSubmit,
                      errors,
                      touched,
                      handleChange,
                      setFieldValue,
                      values}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            value={values.name}
                            onChange={(e: any) => onNameChange(e, handleChange, setFieldValue)}
                            name="name"
                            as="select"
                            className={style.inputFieldOption}>
                            <option key="default" value="">Виберіть звіт: </option>
                            {optionElement}
                        </Field>

                        <Field
                            type="number"
                            name="profit"
                            value={values.profit}
                            className={style.inputField}
                            onChange={handleChange}
                            validate={required}
                        />
                        {errors.profit && touched.profit && <div>{errors.profit}</div>}


                        <Field
                            type="date"
                            name="dateOfStart"
                            value={values.dateOfStart}
                            className={style.inputField}
                            onChange={handleChange}
                            validate={required}
                        />
                        {errors.dateOfStart && touched.dateOfStart && <div>{errors.dateOfStart}</div>}


                        <Field
                            type="date"
                            name="dateOfEnd"
                            value={values.dateOfEnd}
                            className={style.inputField}
                            onChange={handleChange}
                            validate={required}
                        />
                        {errors.dateOfEnd && touched.dateOfEnd && <div>{errors.dateOfEnd}</div>}

                        <button type="submit" className={style.button}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};