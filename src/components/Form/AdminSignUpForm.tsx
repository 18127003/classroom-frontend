import { signupRequest } from "@/actions/auth";
import { AppState } from "@/reducers";
import { adminService } from "@/services";
import { LoadingButton } from "@mui/lab";
import { Alert, Box, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminSignupForm = () => {
    const dispatch = useDispatch();
    const loading = useSelector((state: AppState) => state.auth.loading);
    const error = useSelector((state: AppState)=>state.auth.error.signup);

    const handleLoginSubmit=async(event:SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            name: { value: string };
            password: { value: string };
            email: {value:string};
        };

        dispatch(adminService.adminSignup({
            name: target.name.value,
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
                    id="name"
                    label="Name"
                    name="name"
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
                
                <LoadingButton variant="outlined" type="submit" sx={{m:2}} disabled={loading} loading={loading}>
                        Sign Up
                </LoadingButton>
            </Stack>
            {error && <Alert severity="error">{error}</Alert>}
        </Box>
    )
}

export default AdminSignupForm;