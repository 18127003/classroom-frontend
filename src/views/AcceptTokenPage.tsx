import { joinClassroomRequest } from "@/actions/classrooms";
import { useQuery } from "@/hooks/useQuery";
import { AppState } from "@/reducers";
import { Button, CircularProgress, Grid, Paper } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

type AcceptTokenPageParams = {
    id: string
}

const AcceptTokenPage = ()=>{
    const dispatch = useDispatch()
    const query= useQuery();
    const {id} = useParams<AcceptTokenPageParams>();
    const error = useSelector((state:AppState)=>state.classrooms.error)
    const redirect = useSelector((state:AppState)=>state.detail.redirect)
    const loading = useSelector((state:AppState)=>state.classrooms.loading)

    const handleAccept = ()=>{
        dispatch(joinClassroomRequest({
            code: query.get("code").replace(" ","+"),
            role: query.get("role")
        }))
    }

    if(redirect||error){
        return redirect?<Redirect to={`/classroom/${id}`}/>:<div>{error}</div>
    }

    return (
        
        <Grid container justifyContent="center" sx={{ flexGrow: 1 }}>
            <Grid item>
                <Paper sx={{ height: 140, width: 100 }}>
                    <Button onClick={handleAccept}>
                        Accept
                    </Button>
                    <CircularProgress sx={loading?{}:{display: 'none'}}/>
                </Paper>
            </Grid>
        </Grid>
    )
}

export default AcceptTokenPage;