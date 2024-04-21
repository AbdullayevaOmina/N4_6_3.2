// --------- Authorization  -------------

import { ReactNode } from "react";

export interface Signin{
    username: string;
    password: string|number;
}

export interface Signup extends Signin{
    name: string;
    phone: string;
}

export interface ResetPassword{
    email?: string;
    phone?: string|number;
}


export interface Request{
    signin:(data:Signin)=>unknown,
    signup:(data:Signup)=>unknown,
    signout:()=>void,
    reset:(data:ResetPassword)=>void
}
// ------------- React Tsx , JSX Elmenets -------------

export interface propType{
    children: ReactNode
}
