import axios from "axios";
import { LoginUser, RegisterUser } from "../@types/types";

export const baseUrl = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";
export const usersUrl = `${baseUrl}/users`;
export const loginUrl = `${baseUrl}/users/login`;

export const register = (data: RegisterUser) => axios.post(usersUrl, data);
export const login = (data: LoginUser) => axios.post(loginUrl, data);
export const userDetails = (id: string) => {
    const url = `${usersUrl}/${id}`;
    return axios.get(url, {
        headers: {
            "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTBhZTc1OWRiMzgxM2E2NTAyZmMyZmMiLCJpc0J1c2luZXNzIjp0cnVlLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2OTg4NDI5NTJ9.En62ry5Gu9FMBAvxyltv0eRYhpJIJs_aW06QAtxXRck",

        },
    });
};

export const businessUser = (id: string) => {
    const url = `${usersUrl}/${id}`;
    return axios.patch(url, {
        isBusiness: true,
    }, {
        headers: {
            "x-auth-token": localStorage.getItem("token"),
        },
    });
}



export const auth = {
    register,
    login,
    userDetails,
    businessUser,
};

export default auth;