import {useDispatch, useSelector} from "react-redux";
import {getEnterpriseSelector} from "../../../../Redux/selector/enterprise-selector";
import React, {useEffect, useState} from "react";
import {getEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";
import {changeCompany} from "../../../../Redux/Reducers/company-reducer";
import {Field, Formik} from "formik";
import style from "../Company.module.css";
import {getCompanySelector} from "../../../../Redux/selector/company-selector";

export const ChangeCompanys = () => {
    const enterprise = useSelector(getEnterpriseSelector);
    const company = useSelector(getCompanySelector)
    const dispatch = useDispatch();

    const [name, setName] = useState('')
    const [enterprises, setEnterprises] = useState<Array<string>>( [] )
    const [id, setId] = useState(0)

    useEffect(() => {
        dispatch(getEnterprise());
    }, []);
    const submit = () => {
        console.log(id)
        console.log(name)
        console.log(enterprises)

        dispatch(changeCompany(id, name, enterprises));
        setName('');
        setEnterprises([]);
    };
    const onEnterpriseChange = (e: any) => {
        const selectedEnterprise = e.target.value;
        const isChecked = e.target.checked;
        if (isChecked) {
            setEnterprises([...enterprises, selectedEnterprise]);
        } else {
            const index = enterprises.indexOf(selectedEnterprise);
            if (index > -1) {
                const newEnterprises = enterprises.slice();
                newEnterprises.splice(index, 1);
                setEnterprises(newEnterprises);
            }
        }
    }

    let checkboxElements = enterprise.map(d => {
        const checked = enterprises.includes(d.name);
        return (
            <div key={d.id}>
                <label>
                    <Field
                        type="checkbox"
                        name="enterprises"
                        value={d.name}
                        checked={checked}
                        onChange={onEnterpriseChange}
                    />
                    {d.name}
                </label>
            </div>
        );
    });
    const onNameChange = (e: any) => {
        const selectedName = e.currentTarget.value;
        setName(selectedName);

        const selectedEnterprise = company.find(d => d.name === selectedName);
        if (selectedEnterprise) {
            setEnterprises(selectedEnterprise.enterprises);
            setId(selectedEnterprise.id)
        }
    }

    let optionElement = company.map(d => <option key={d.id} value={d.name}>{d.name}</option>);

    return (
        <div>
            <Formik
                initialValues={{ id: id, name: name, enterprises: enterprises}}
                onSubmit={submit}
            >
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            value={name}
                            name="name" as="select"
                            className={style.inputField}
                            onChange={onNameChange}

                        >
                            {optionElement}
                        </Field>

                        <div className={style.CompanyNameList}>
                            {checkboxElements}
                        </div>

                        <button type="submit" className={style.button}>
                            Submit
                        </button>
                    </form>
                )}
            </Formik>
        </div>
    );
};