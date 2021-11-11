import { signupRequest } from "@/actions/auth";
import { AppState } from "@/reducers";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SignupForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: AppState) => state.auth.loading);
    const error = useSelector((state: AppState)=>state.auth.error);

    const handleLoginSubmit=async(event:SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
            email: {value:string};
        };

        dispatch(signupRequest({
            name: target.username.value,
            password: target.password.value,
            email: target.email.value
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
                    id="email"
                    label="Email"
                    name="email"
                    type="email"
                />
                <TextField
                    required
                    type="password"
                    id="password"
                    label="Password"
                    name="password"
                />
                
                <Button variant="outlined" type="submit" sx={{m:2}} disabled={loading}>
                        Sign Up
                </Button>
                {loading && (
                    <CircularProgress
                        size={24}
                        sx={{
                            position: 'absolute',
                            top: '91%',
                            left: '45%',
                            marginTop: '-17%',
                        }}
                    />
                )}
                <Link to="/login" style={{ textDecoration: 'none' }}>
                    Login
                </Link>
          
            </Stack>
        </Box>
    )
}

export default SignupForm;