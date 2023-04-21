import {Field, Formik} from "formik";
import style from "../Company.module.css";
import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addCompany} from "../../../../Redux/Reducers/company-reducer";
import {getEnterpriseSelector} from "../../../../Redux/selector/enterprise-selector";
import {getEnterprise} from "../../../../Redux/Reducers/enterprise-reducer";

export const AddCompanys = () => {
    const enterprise = useSelector(getEnterpriseSelector);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getEnterprise());
    }, []);

    const submit = (values: { name: string, enterprises: Array<string> }) => {
        dispatch(addCompany(values.name, values.enterprises));
        values.name = "";
        values.enterprises = [];
    };

    let checkboxElements = enterprise.map(d => {
        return (
            <div key={d.id}>
                <label>
                    <Field type="checkbox" name="enterprises" value={d.name}/>
                    {d.name}
                </label>
            </div>
        );
    });

    return (
        <div>
            <Formik
                initialValues={{name: "", enterprises: []}}
                onSubmit={submit}
            >
                {({values, handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            type="text"
                            name="name"
                            value={values.name}
                            className={style.inputField}
                        />

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
