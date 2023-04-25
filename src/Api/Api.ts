import axios from "axios";
import {EnterpriseType} from "../Redux/Types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/',
});

export const EnterpriseApi = {
    getEntries() {
        return instance.get<EnterpriseType[]>(`enterprise`)
            .then(res => res.data);
    },
    postEnterprise(name: string, profit: number, dateOfCreation: string) {
        const data = {
            name,
            profit,
            dateOfCreation
        };
        return instance.post<EnterpriseType>(`enterprise`, data)
            .then((res) => res.data);
    },
    putEnterprise(id: number, name: string, profit: number, dateOfCreation: string) {
        const data = {
            profit,
            dateOfCreation
        };

        return instance.put(`enterprise/${id}`, data)
            .then((res) => res.data);
    },
    deleteEnterprise(id: number){
        return instance.delete(`enterprise/${id}`)
            .then((res) => res.data);
    }
}
export const CompanyApi = {
    getCompany(){
        return instance.get('company')
            .then((res) => res.data)
    },
    postCompany(name: string, enterprises: Array<string>){
        const data ={
            name,
            enterprises
        }
        return instance.post('company', data)
            .then((res) => res.data)
    },
    putCompany(id: number, name: string, enterprises: Array<string>){
        const data ={
            name,
            enterprises
        }
        return instance.put(`company/${id}`, data)
            .then((res) => res.data)
    },
    deleteCompany(id: number){
        return instance.delete(`company/${id}`)
            .then((res) => res.data)
    }
}


export const FinancialReportApi = {
    getFinancialReport(){
        return instance.get('financialReport')
            .then((res) => res.data)
    },
    postFinancialReport(name: string,
                        profit: number,
                        dateOfStart: string,
                        dateOfEnd: string,
                        isFixed: "true" | "false"){
        const data ={
            name,
            profit,
            dateOfStart,
            dateOfEnd,
            isFixed
        }
        return instance.post('financialReport', data)
            .then((res) => res.data)
    },
    putFinancialReport(id: number,
                       name: string,
                       profit: number,
                       dateOfStart: string,
                       dateOfEnd: string,
                       isFixed: "true" | "false"){
        const data ={
            name,
            profit,
            dateOfStart,
            dateOfEnd,
            isFixed
        }
        return instance.put(`financialReport/${id}`, data)
            .then((res) => res.data)
    },
    deleteFinancialReport(id: number){
        return instance.delete(`financialReport/${id}`)
            .then((res) => res.data)
    }
}