import React, {useState} from "react";
import {Field, Formik} from "formik";
import {addEnterprise} from "../../../Redux/Reducers/enterprise-reducer";
import {EnterpriseType} from "../../../Redux/Types/types";

export const AddEnterprise = () => {

    const [name, setName] = useState('')
    const [profit, setProfit] = useState(0)
    const [dateOfCreation, setDateOfCreation] = useState('')

    const submit = (): void => {
        let enterprise: EnterpriseType = {
            name,
            profit,
            dateOfCreation
        }
        addEnterprise(enterprise);
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
                        type='text' name='name' />
                    <Field
                        value={profit} onChange={onProfitChange}
                        type='text' name='profit' />
                    <Field
                        value={dateOfCreation} onChange={onDateOfCreationChange}
                        type='text' name='dateOfCreation' />

                    <button type="submit">
                        Submit
                    </button>
                </form>
            )}
        </Formik>
    </div>
}