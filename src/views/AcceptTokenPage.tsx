import { joinClassroomRequest } from "@/actions/classrooms";
import { useQuery } from "@/hooks/useQuery";
import { Button, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

const AcceptTokenPage = ()=>{
    const dispatch = useDispatch()
    const query= useQuery();
    const [accept, setAccept] = useState(false)

    const handleAccept = ()=>{
        dispatch(joinClassroomRequest({
            code: query.get("code").replace(" ","+"),
            role: query.get("role")
        }))
    }

    return (
        
        <Grid container justifyContent="center" sx={{ flexGrow: 1 }}>
            <Grid item>
                <Paper sx={{ height: 140, width: 100 }}>
                    <Button onClick={handleAccept}>
                        Accept
                    </Button>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AcceptTokenPage;