import { loginRequest } from "@/actions/auth";
import { AppState } from "@/reducers";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../GoogleLoginButton";

const LoginForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: AppState) => state.auth.loading);
    const error = useSelector((state: AppState)=>state.auth.error.login);

    const handleLoginSubmit=async(event:SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
            password: { value: string };
        };

        dispatch(loginRequest({
            email: target.email.value,
            password: target.password.value
        }))
    }

    return(
        <Box 
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1 },
            }}
            onSubmit={handleLoginSubmit}
        >
            <Stack sx={{alignItems:'center'}}>
                <TextField
                    autoFocus
                    required
                    type="email"
                    id="email"
                    label="Email"
                    name="email"
                />
                <TextField
                    required
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                />
                
                <LoadingButton variant="outlined" type="submit" sx={{m:2}} disabled={loading} loading={loading}>
                        Login
                </LoadingButton>
                <GoogleLoginButton/>
                <Link to="/forgetPassword">Forgot Password?</Link>
            </Stack>
            {error && <Alert severity="error" sx={{mt:2}}>{error}</Alert>}
        </Box>
    )
}

export default LoginForm;