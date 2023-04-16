import axios from "axios";
import {EnterpriseType} from "../Redux/Types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/',
});

export const EnterpriseApi = {
    getEntries() {
        return instance.get<EnterpriseType[]>(`enterprise`).then(res => res.data);
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