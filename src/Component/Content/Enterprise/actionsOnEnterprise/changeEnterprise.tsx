import React from "react";
import { Field, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import style from "../Enterprise.module.css";
import { getEnterpriseSelector } from "../../../../Redux/selector/enterprise-selector";
import { changeEnterprise } from "../../../../Redux/Reducers/enterprise-reducer";
import {required} from "../../../../utils/validators/validators";

type SubmitType = {
    name: string,
    profit: number,
    dateOfCreation: string,
    id: number,
    successCheck: boolean
}
export const ChangeEnterprise = () => {
    const enterprise = useSelector(getEnterpriseSelector);
    const dispatch = useDispatch();

    const submit = (values: SubmitType) => {
        dispatch(
            changeEnterprise(values.id, values.name, Number(values.profit), values.dateOfCreation)
        );
        values.successCheck = true;
        setTimeout(() => {
            values.successCheck = false;
        }, 3000);
    };

    const onNameChange = (e: any, handleChange: any, setFieldValue: any) => {
        const selectedName = e.currentTarget.value;
        handleChange(e);
        const selectedEnterprise = enterprise.find((d) => d.name === selectedName);
        if (selectedEnterprise) {
            setFieldValue("profit", selectedEnterprise.profit);
            setFieldValue("dateOfCreation", selectedEnterprise.dateOfCreation);
            setFieldValue("id", selectedEnterprise.id);
        }
    };

    let optionElement = enterprise.map((d) => (
        <option key={d.id} value={d.name}>
            {d.name}
        </option>
    ));

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    name: "",
                    profit: 0,
                    dateOfCreation: "",
                    id: 1,
                    successCheck: false
                }}
                onSubmit={submit}
            >
                {({ handleSubmit,
                      errors,
                      touched,
                      handleChange,
                      setFieldValue, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            value={values.name}
                            onChange={(e: any) => onNameChange(e, handleChange, setFieldValue)}
                            name="name"
                            as="select"
                            className={style.inputFieldOption}
                            validate={required}
                        >
                            <option key="default" value="">
                                Виберіть підприємство:
                            </option>
                            {optionElement}
                        </Field>

                        <Field
                            value={values.profit}
                            onChange={handleChange}
                            type="number"
                            name="profit"
                            className={style.inputField}
                            validate={required}
                        />
                        {errors.profit && touched.profit && <div>{errors.profit}</div>}

                        <Field
                            value={values.dateOfCreation}
                            onChange={handleChange}
                            type="date"
                            name="dateOfCreation"
                            placeholder="дд-мм-рррр"
                            className={style.inputField}
                            validate={required}
                        />
                        {errors.dateOfCreation && touched.dateOfCreation && <div>{errors.dateOfCreation}</div>}

                        <button type="submit" className={style.button}>
                            Submit
                        </button>
                        {values.successCheck ? <p>Змінено</p> : <p></p>}
                    </form>
                )}
            </Formik>
        </div>
    );
};
