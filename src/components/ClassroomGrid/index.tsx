import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import ClassroomCard from "./ClassroomCard";
import { AppState } from "@/reducers";
import { useDispatch, useSelector } from "react-redux";
import { getClassroomsRequest } from "@/actions/classrooms";

const ClassroomsGrid: React.FC = ()=>{
    const classes = useSelector((state: AppState)=>state.classrooms.classes);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getClassroomsRequest({
            reload: true
        }))
    },[])

    return (
        <Box sx={{ flexGrow: 1, m:9 }} alignSelf='center'>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}>
                {classes && classes.map((classroom) => (
                    <Grid item xs={6} sm={3} md={3} key={classroom.id}>
                        <ClassroomCard classroom={classroom}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default ClassroomsGrid;