import { createContext, useEffect, useState } from "react";
import { JwtDecodeType } from "../@types/types";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
    isLoggedIn: false,
    isBusiness: false,
    isAdmin: false,
    login: (jwt: string) => { },
    logout: () => { },
});

export const AuthContextProvider = ({ children }) => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isBusiness, setisBusiness] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsLoggedIn(true);
            setisBusiness(true);
            const decoded: JwtDecodeType = jwtDecode(token);
            setisBusiness(decoded.isBusiness);

        }
    }, [])

    const login = (jwt: string) => {
        setIsLoggedIn(true);
        const decoded: JwtDecodeType = jwtDecode(jwt);
        setisBusiness(decoded.isBusiness);
        setIsAdmin(decoded.isAdmin);
        localStorage.setItem("token", jwt);
    };
    const logout = () => {
        setIsLoggedIn(false);
        setisBusiness(false);
        localStorage.removeItem("token");
    };




    return (
        <AuthContext.Provider value={{ isLoggedIn, isBusiness, login, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};