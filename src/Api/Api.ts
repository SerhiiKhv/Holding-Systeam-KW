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
        console.log(data)
        return instance.post<EnterpriseType>(`enterprise`, JSON.stringify(data)).then((res) => res.data);
    }
}