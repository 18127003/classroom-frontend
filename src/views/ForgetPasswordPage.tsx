import BasicSnackBar from "@/components/BasicSnackBar"
import { authService } from "@/services"
import { Button, Card, CardActions, CardContent, Grid, TextField,Box, Alert } from "@mui/material"
import React, { SyntheticEvent, useState } from "react"

const ForgetPasswordPage: React.FC = ()=>{
    const [error, setError]=useState<string|null>(null)
    const [msg, setMsg]=useState<string|null>(null)

    const onClick=async(event:SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
        };
        try {
            authService.requestResetPassword(target.email.value)
            setMsg('Please check your email for reset password link')
        } catch (e){
            setError('Server error')
        }    
    }
    return(
        <>
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '100vh' }}
            >
                <Grid item xs={3}>
                    <Box 
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1 },
                        }}
                        onSubmit={onClick}
                    >
                        <Card sx={{}}>
                            <CardContent>
                                <TextField name="email" label="Mail" variant="outlined" placeholder="Input your email" required />
                            </CardContent>
                            <CardActions sx={{justifyContent:"center"}}>
                                <Button type="submit">Verify Mail</Button>
                            </CardActions>
                        </Card>
                    </Box>
                </Grid>
                {msg && <Alert severity="success" sx={{mt:2}}>{msg}</Alert>}  
            </Grid>
            <BasicSnackBar type="error" msg={error}/>
        </>  
    )
}
export default ForgetPasswordPage