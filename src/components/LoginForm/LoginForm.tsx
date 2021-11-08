import useAuth from "@/hooks/useAuth";
import { Box, Button, CircularProgress, Stack, TextField } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
    const auth = useAuth();
    const history = useHistory();
    const [loading, setLoading]=useState(false);

    const handleLoginSubmit=(event:SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };

        setLoading(true)
        auth?.login(
            {
                username: target.username.value,
                password: target.password.value
            },
            ()=>{
                setLoading(false)
                history.push("/")
            }
        )

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