import {useDispatch, useSelector} from "react-redux";
import {getFinancialReportSelector} from "../../../../Redux/selector/financialReport-selector";
import React, {useState} from "react";
import {changeFinancialReport, destroyFinancialReport} from "../../../../Redux/Reducers/financialReport-reducer";
import {Field, Formik} from "formik";
import style from "../../Company/Company.module.css";

export const DeleteFinancialReport = () => {

    const financialReport = useSelector(getFinancialReportSelector)
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [id, setId] = useState(0)

    const submit = () => {
        dispatch(destroyFinancialReport(id));
    };

    const onNameChange = (e: any) => {
        const selectedName = e.currentTarget.value;
        setName(selectedName);

        const selectedFinancialReport = financialReport.find(d => d.name === selectedName);
        if (selectedFinancialReport) {
            setId(selectedFinancialReport.id)
        }
    }

    let optionElement = financialReport.map(d => <option key={d.id} value={d.name}>{d.name}</option>);

    return (
        <div>
            <Formik
                initialValues={{name: "", profit: 0,
                    dateOfStart: "11.11.1111",
                    dateOfEnd: "11.11.1111"}}
                onSubmit={submit}
            >
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            value={name} onChange={onNameChange}
                            name="name" as="select" className={style.inputField}>
                            <option key="default" value="">Виберіть звіт: </option>
                            {optionElement}
                        </Field>

                        <button type="submit" className={style.button}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};