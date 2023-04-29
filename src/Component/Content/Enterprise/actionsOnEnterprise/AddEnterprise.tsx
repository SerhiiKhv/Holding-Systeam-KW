import React, {useState} from "react";
import {Field, Formik} from "formik";
import {addEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";
import {useDispatch} from "react-redux";
import style from "../Enterprise.module.css";

export const AddEnterprise = () => {

    const [name, setName] = useState('')
    const [profit, setProfit] = useState(0)
    const [dateOfCreation, setDateOfCreation] = useState('')

    const dispatch = useDispatch()

    const submit = (): void => {
        dispatch(addEnterprise(name, Number(profit), dateOfCreation));
        setName('');
        setProfit(0);
        setDateOfCreation('');
    };


    const onNameChange = (e: any) => {
        setName(e.currentTarget.value);
    }
    const onProfitChange = (e: any) => {
        setProfit(e.currentTarget.value);
    }

    const onDateOfCreationChange = (e: any) => {
        setDateOfCreation(e.currentTarget.value);
    }

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
                        type='text' name='name' className={style.inputField}
                        placeholder={"Назва"}/>
                    <Field
                        value={profit} onChange={onProfitChange}
                        type='number' name='profit' className={style.inputField}/>
                    <Field
                        value={dateOfCreation} onChange={onDateOfCreationChange}
                        type='text' name='dateOfCreation' className={style.inputField}
                        placeholder={"дд.мм.рррр"}/>

                    <button type="submit" className={style.button}>
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
}

