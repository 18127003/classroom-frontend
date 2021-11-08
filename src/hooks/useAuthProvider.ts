import { Account, AuthRequest } from "@/model/model"
import { loginUser } from "@/services/service"
import { useState } from "react"

export interface IUseAuthProvider{
    login:(auth:AuthRequest, cb: ()=>void)=>void
    logout:(cb:()=>void)=>void
    user: Account|null
}

const useAuthProvider=()=>{
    const [user, setUser]=useState<null|Account>(null)
    const login= async (auth:AuthRequest, cb:()=>void)=>{
        const res = await loginUser(auth);
        setUser(res.data);
        cb();
    }
    const logout=(cb:()=>void)=>{
        setUser(null);
    }
    return {
        user,
        login,
        logout
    }
}

export default useAuthProvider;