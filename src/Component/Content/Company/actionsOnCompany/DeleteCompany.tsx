import {useDispatch, useSelector} from "react-redux";
import React, {useState} from "react";
import {Field, Formik} from "formik";
import style from "../../Enterprise/Enterprise.module.css";
import {destroyCompany} from "../../../../Redux/Reducers/company-reducer";
import {getCompanySelector} from "../../../../Redux/selector/company-selector";

export const DeleteCompanys = () => {
    const company = useSelector(getCompanySelector)
    const [name, setName] = useState('')
    const [id, setId] = useState(1)
    const [successCheck, setSuccessCheck] = useState(false)

    const dispatch = useDispatch()

    const submit = (): void => {
        dispatch(destroyCompany(id));
        setSuccessCheck(true)

        setTimeout(() => {
            setSuccessCheck(false); // Зміна значення successCheck на false через 3 секунди
        }, 3000);
    };

    const onNameChange = (e: any) => {
        const selectedName = e.currentTarget.value;
        setName(selectedName);

        const selectedCompany = company.find(d => d.name === selectedName);
        if (selectedCompany) {
            setId(selectedCompany.id)
        }
    }

    let optionElement = company.map(d =>  <option key={d.id} value={d.name}>{d.name}</option>);

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
                        name="name" as="select" className={style.inputField}>
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