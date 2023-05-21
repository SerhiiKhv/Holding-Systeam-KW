import React from "react";
import {Field, Formik} from "formik";
import {addEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";
import {useDispatch} from "react-redux";
import style from "../Enterprise.module.css";
import {required} from "../../../../utils/validators/validators";

export const AddEnterprise = () => {
    const dispatch = useDispatch()

    const submit = (values: {name: string, profit: number, dateOfCreation: string}): void => {
        dispatch(addEnterprise(values.name, Number(values.profit), values.dateOfCreation));
        values.name = ''
        values.profit = 0
        values.dateOfCreation = ''
    };

    return <div>
        <Formik
            enableReinitialize
            initialValues={{name: '', profit: 0, dateOfCreation: ''}}
            onSubmit={submit}
        >
            {({errors, touched,
                  values,handleSubmit
            }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        value={values.name}
                        type='text' name='name' className={style.inputField}
                        placeholder={"Назва"} validate={required}/>
                    {errors.name && touched.name && <div>{errors.name}</div>}

                    <Field
                        value={values.profit}
                        type='number' name='profit' className={style.inputField}
                        validate={required}/>
                    {errors.profit && touched.profit && <div>{errors.profit}</div>}

                    <Field
                        value={values.dateOfCreation}
                        type='date' name='dateOfCreation'
                        className={style.inputField}
                        validate={required}
                        />
                    {errors.dateOfCreation && touched.dateOfCreation && <div>{errors.dateOfCreation}</div>}

                    <button type="submit" className={style.button}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
}

