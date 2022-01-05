import { authService } from "@/services"
import { Button, Card, CardActions, CardContent, Grid, TextField,Box } from "@mui/material"
import React, { SyntheticEvent } from "react"

const ForgetPasswordPage: React.FC = ()=>{
    const onClick=async(event:SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            email: { value: string };
        };
        try {
            authService.requestResetPassword(target.email.value)
        } catch (e){
            console.log(e)
        }    
    }
    return(
        <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center" style={{ display:'flex', justifyContent:'center'}}>
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
        </Grid>
    )
}
export default ForgetPasswordPage