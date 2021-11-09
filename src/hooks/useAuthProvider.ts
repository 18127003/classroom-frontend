import { Account, AuthRequest } from "@/model/model"
import { loginUser } from "@/services/service"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"

export interface IUseAuthProvider{
    login:(auth:AuthRequest, cb: ()=>void)=>void
    logout:(cb:()=>void)=>void
    user: Account|null
}

const useAuthProvider=()=>{
    const [user, setUser]=useState<null|Account>(null)
    const [cookies, setCookie, removeCookie] = useCookies(['user']);

    useEffect(()=>{
        setUser(cookies.user)
    },[])

    const login= async (auth:AuthRequest, cb:()=>void)=>{
        const res = (await loginUser(auth)).data;
        setUser(res);
        setCookie('user',res,{
            'path':'/',
            'maxAge':3600000
        });
        cb();
    }
    const logout=(cb:()=>void)=>{
        setUser(null);
        removeCookie('user');
        cb();
    }
    return {
        user,
        login,
        logout
    }
}

export default useAuthProvider;