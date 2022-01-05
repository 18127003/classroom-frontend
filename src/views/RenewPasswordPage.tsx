import { useQuery } from "@/hooks/useQuery"
import { authService } from "@/services"
import { Button, Card, CardActions, CardContent, TextField,Box } from "@mui/material"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { Redirect } from "react-router-dom"

const RenewPasswordPage: React.FC =()=>{
    const query=useQuery()
    const [token,setToken]=useState<string|null>(null)
    const [error, setError]=useState<string|null>('')
    useEffect(
        ()=>{
            if(query.get("token")!==null){
                setToken(query.get("token"))
            }
        },[]
    )

    const onSubmit=async(event:SyntheticEvent)=>{
        event.preventDefault();
        const target = event.target as typeof event.target & {
            password: { value: string };
        };
        try{
           await authService.resetPassword(target.password.value,token)
           setError(null)
        }catch(e){
            setError(e)
        }
    }

    if (error===null){
        return <Redirect to={"/login"}/>
    }

    return(
        <Box 
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 },
                }}
                onSubmit={onSubmit}
            >
            <Card>
            <CardContent>
                <TextField name="password" label="New Password" variant="outlined" type={"password"} required />
            </CardContent>
            <CardActions>
                <Button type="submit">Set Password</Button>
            </CardActions>
        
            </Card>

        </Box>
        
        
    )
}
export default RenewPasswordPage