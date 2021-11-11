import { loginRequest } from "@/actions/auth";
import { AppState } from "@/reducers";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import GoogleLoginButton from "../GoogleLoginButton";

const LoginForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: AppState) => state.auth.loading);
    const error = useSelector((state: AppState)=>state.auth.error);

    const handleLoginSubmit=async(event:SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };

        dispatch(loginRequest({
            username: target.username.value,
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
                    id="username"
                    label="Username"
                    name="username"
                />
                <TextField
                    required
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                />
                
                <Button variant="outlined" type="submit" sx={{m:2}} disabled={loading}>
                        Login
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            top: '80%',
                            left: '45%',
                            marginTop: '-22%',
                        }}
                    />
                )} 
                <Link to="/signup" style={{ textDecoration: 'none' }}>
                    Don't have an account? Signup
                </Link>
                <GoogleLoginButton/>
            </Stack>
        </Box>
    )
}

export default LoginForm;