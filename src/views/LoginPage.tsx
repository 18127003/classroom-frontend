import useAuth from "@/hooks/useAuth";
import React from "react";
import { useHistory } from "react-router-dom";

const LoginPage = ()=>{
    const auth = useAuth();
    const history = useHistory();
    const handleLogin = ()=>{
        auth?.login(()=>{
            history.push("/")
        })
    }

    return (
        <>
            <button onClick={handleLogin}>
                Login 
            </button>
        </>
    )
}

export default LoginPage;