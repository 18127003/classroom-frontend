import { loginRequest } from "@/actions/auth";
import { AppState } from "@/reducers";
import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
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
            <Typography variant="body2" color="red">{error}</Typography>
        </Box>
    )
}

export default LoginForm;