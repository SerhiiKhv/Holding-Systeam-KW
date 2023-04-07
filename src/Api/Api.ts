import axios from "axios";
import {EnterpriseType} from "../Redux/Types/types";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:4000/',
});

export const EnterpriseApi = {
    getEntries(){
        return instance.get<EnterpriseType>(`enterprise`).then(res => res.data);
    }
}

/*

export const ProfileAPI = {
    getProfile(userId: number | null){
        return instance.get<ProfileType>(`profile/` + userId).then(res => res.data);
    },
    getStatus(userId: number){
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },
    putStatus(status: string){
        return instance.put<PutStatusResponseType>(`profile/status`, {status: status}).then(res => res.data);
    },
    putPhotos(photosFile: any){
        const formData = new FormData();
        formData.append("image", photosFile);
        return instance.put<PutPhotosResponseType>(`profile/photo`, formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }}).then(res => res.data);
    },
    putProfile(profile: ProfileType){
        return instance.put<PutProfileResponseType>(`profile`, {profile: profile}).then(res => res.data);
    }
}*/
