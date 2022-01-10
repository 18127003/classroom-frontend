import BasicSnackBar from "@/components/BasicSnackBar";
import { useQuery } from "@/hooks/useQuery";
import { authService } from "@/services";
import { Box, Button, Grid, Paper, Card, CardActions, CardContent } from "@mui/material";
import React, { useState } from "react";
import { Redirect } from "react-router-dom";

const ActivateAccountPage: React.FC = ()=>{
    const query= useQuery();
    const token = query.get("token")
    const [error, setError] = useState<string|null>(null)
    const [accept, setAccept] = useState(false)

    const handleAccept = async ()=>{
        try{
            await authService.activateAccount(token)
            setAccept(true)
        } catch (e){
            setError('Server error')
        }
    }

    if (accept){
        return <Redirect to={"/login"}/>
    }

    return (
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
                    <Card>
                        <CardContent>
                            Click the button below to activate your account
                        </CardContent>
                        <CardActions sx={{display:'flex', justifyContent:'center'}}>
                            <Button onClick={handleAccept} variant="outlined">Activate</Button>
                        </CardActions>
                    </Card>
                </Grid>   
            </Grid>
            <BasicSnackBar type="error" msg={error}/>
        </>
    )
}

export default ActivateAccountPage;