
import LoginForm from "@/components/Form/LoginForm";
import { Box } from "@mui/material";
import React from "react";

const LoginPage = ()=>{

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'center'}}>
            <Box sx={{m:12, position: 'relative' }}>
                <LoginForm/>
            </Box>
        </Box>
    )
}

export default LoginPage;