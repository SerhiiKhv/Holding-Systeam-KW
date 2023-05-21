import React from "react";
import {Field, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import style from "../Enterprise.module.css";
import {getEnterpriseSelector} from "../../../../Redux/selector/enterprise-selector";
import {destroyEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";

export const DeleteEnterprise = () => {
    const enterprise = useSelector(getEnterpriseSelector)

    const dispatch = useDispatch()
    const submit = (values: {name: string, id: number, successCheck: boolean}): void => {
        dispatch(destroyEnterprise(values.id));
        values.successCheck = true;

        setTimeout(() => {
            values.successCheck = false;
        }, 3000);
    };

    const onNameChange = (e: any, handleChange: any, setFieldValue: any) => {
        const selectedName = e.currentTarget.value;
        handleChange(e);

        const selectedEnterprise = enterprise.find(d => d.name === selectedName);
        if (selectedEnterprise) {
            setFieldValue("id", selectedEnterprise.id);
        }
    }

    let optionElement = enterprise.map(d =>  <option key={d.id} value={d.name}>{d.name}</option>);

    return <div>
        <Formik
            enableReinitialize
            initialValues={{
                name: '',
                id: 0,
                successCheck: false}}
            onSubmit={submit}
        >
            {({   values,
                  handleChange,
                  setFieldValue,
                  handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        value={values.name} onChange={(e: any) => onNameChange(e, handleChange, setFieldValue)}
                        name="name" as="select" className={style.inputFieldOption}>
                        <option key="default" value="">Виберіть підприємство:</option>
                        {optionElement}
                    </Field>

                    <button type="submit" className={style.button}>
                        Submit
                    </button>
                    {values.successCheck? <p>Видалено</p> : <p></p>}
                </form>
            )}
        </Formik>
    </div>
}

