import { ReactNode } from "react";

export type LoginUser = {
    email: string;
    password: string;
};


export type RegisterUser = {
    [x: string]: any;
    title: ReactNode;
    subtitle: ReactNode;
    name: {
        first: string;
        middle?: string;
        last: string;
    };
    phone: string;
    email: string;
    password: string;
    image?: {
        url: string;
        alt?: string;
    };
    address: {
        state?: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
    };
    isBusiness: boolean;
};

export type CardType = {
    [x: string]: any;
    _id: string;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;
        _id: string;
    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;
        _id: string;
    };
    bizNumber: number;
    likes: string[];
    user_id: string;
    createdAt: string;
    __v: number;
};

export type CreateType = {
    [x: string]: any;
    title: string;
    subtitle: string;
    description: string;
    phone: string;
    email: string;
    web: string;
    image: {
        url: string;
        alt: string;

    };
    address: {
        state: string;
        country: string;
        city: string;
        street: string;
        houseNumber: number;
        zip: number;

    };

};

export type ErrorType = {
    status: number;
    message: string;
    details: string;
};


export type JwtDecodeType = {
    _id: string;
    iat: number;
    exp: number;
    isBusiness: boolean;
    isAdmin: boolean;
}


export type FCC = ({ children: ReactNode }) => ReactNode