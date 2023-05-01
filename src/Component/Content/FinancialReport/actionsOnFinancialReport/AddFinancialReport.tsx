import {useDispatch, useSelector} from "react-redux";
import {getEnterpriseSelector} from "../../../../Redux/selector/enterprise-selector";
import React, {useEffect} from "react";
import {getEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";
import {Field, Formik} from "formik";
import style from "../../Company/Company.module.css";
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
                            name="name" as="select" className={style.inputField}>
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
                            type="text"
                            name="dateOfStart"
                            value={values.dateOfStart}
                            className={style.inputField}
                            placeholder={"дд.мм.рррр"}
                        />

                        <Field
                            type="text"
                            name="dateOfEnd"
                            value={values.dateOfEnd}
                            className={style.inputField}
                            placeholder={"дд.мм.рррр"}
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