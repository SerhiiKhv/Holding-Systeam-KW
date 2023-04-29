import React, {useState} from "react";
import {Field, Formik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import style from "../Enterprise.module.css";
import {getEnterpriseSelector} from "../../../../Redux/selector/enterprise-selector";
import {changeEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";

export const ChangeEnterprise = () => {

    const enterprise = useSelector(getEnterpriseSelector)
    const [name, setName] = useState('')
    const [profit, setProfit] = useState(0)
    const [dateOfCreation, setDateOfCreation] = useState('')
    const [id, setId] = useState(1)
    const [successCheck, setSuccessCheck] = useState(false)

    const dispatch = useDispatch()

    const submit = (): void => {
        dispatch(changeEnterprise(id, name, Number(profit), dateOfCreation));
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
            setProfit(selectedEnterprise.profit);
            setDateOfCreation(selectedEnterprise.dateOfCreation);
            setId(selectedEnterprise.id)
        }
    }
    const onProfitChange = (e: any) => {
        setProfit(e.currentTarget.value);
    }

    const onDateOfCreationChange = (e: any) => {
        setDateOfCreation(e.currentTarget.value);
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
                        name="name" as="select" className={style.inputField}>
                        {optionElement}
                    </Field>

                    <Field
                        value={profit} onChange={onProfitChange}
                        type='number' name='profit' className={style.inputField}/>

                    <Field
                        value={dateOfCreation} onChange={onDateOfCreationChange}
                        type='text' name='dateOfCreation' placeholder={"дд.мм.рррр"}
                        className={style.inputField}/>

                    <button type="submit" className={style.button}>
                        Submit
                    </button>
                    {successCheck? <p>Змінено</p> : <p></p>}
                </form>
            )}
        </Formik>
    </div>
}
