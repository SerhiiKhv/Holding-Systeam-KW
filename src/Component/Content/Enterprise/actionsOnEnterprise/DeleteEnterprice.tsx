import React, {useState} from "react";
import {Field, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import style from "../Enterprise.module.css";
import {getEnterpriseSelector} from "../../../../Redux/selector/enterprise-selector";
import {destroyEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";

export const DeleteEnterprise = () => {

    const enterprise = useSelector(getEnterpriseSelector)
    const [name, setName] = useState('')
    const [id, setId] = useState(1)
    const [successCheck, setSuccessCheck] = useState(false)

    const dispatch = useDispatch()

    const submit = (): void => {
        dispatch(destroyEnterprise(id));
        setSuccessCheck(true)

        setTimeout(() => {
            setSuccessCheck(false); // Зміна значення successCheck на false через 3 секунди
        }, 3000);
    };

    const onNameChange = (e: any) => {
        const selectedName = e.currentTarget.value;
        setName(selectedName);

        const selectedEnterprise = enterprise.find(d => d.name === selectedName);
        if (selectedEnterprise) {
            setId(selectedEnterprise.id)
        }
    }

    let optionElement = enterprise.map(d =>  <option key={d.id} value={d.name}>{d.name}</option>);

    return <div>
        <Formik
            enableReinitialize
            initialValues={{name: '', profit: 0, dateOfCreation: ''}}
            onSubmit={submit}
        >
            {({
                  handleSubmit
              }) => (
                <form onSubmit={handleSubmit}>
                    <Field
                        value={name} onChange={onNameChange}
                        name="name" as="select" className={style.inputFieldOption}>
                        <option key="default" value="">Виберіть підприємство:</option>
                        {optionElement}
                    </Field>

                    <button type="submit" className={style.button}>
                        Submit
                    </button>
                    {successCheck? <p>Видалено</p> : <p></p>}
                </form>
            )}
        </Formik>
    </div>
}

