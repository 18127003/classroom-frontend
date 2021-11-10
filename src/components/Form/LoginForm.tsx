import { loginRequest } from "@/actions/auth";
import { AppState } from "@/reducers";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const LoginForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: AppState) => state.auth.loading);
    const auth = useSelector((state: AppState)=>state.auth.user);
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

    if(auth!==null && auth!==undefined){
        return <Redirect to="/"/>
    }
    return(
        <Box 
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1 },
            }}
            onSubmit={handleLoginSubmit}
        >
            <Stack>
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
                            position: 'relative',
                            top: '50%',
                            left: '50%',
                            marginTop: '-19%',
                            marginLeft: '-5%'
                        }}
                    />
                )}
                
            </Stack>
        </Box>
    )
}

export default LoginForm;