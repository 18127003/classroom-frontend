import { Account } from "@/model/model"
import { loginUser } from "@/services/service"
import { useState } from "react"

export interface IUseAuthProvider{
    login:(cb: ()=>void)=>void
    logout:(cb:()=>void)=>void
    user: Account|null
}

const useAuthProvider=()=>{
    const [user, setUser]=useState<null|Account>(null)
    const login= async (cb:()=>void)=>{
        const res = await loginUser();
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