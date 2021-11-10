import React, { useEffect } from "react";
import { Grid, Box } from "@mui/material";
import ClassroomCard from "./ClassroomCard";
import { ClassroomGridProps } from "@/@types/props";
import { useDispatch, useSelector } from "react-redux";
import { reduxAction } from "@/actions";
import { ClassroomsState } from "@/@types/state";


const ClassroomsGrid: React.FC<ClassroomGridProps> = ({classes})=>{
    // const classes = useSelector((state: ClassroomsState)=>state.classes);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(reduxAction.getClassrooms());
    // }, []);

    return (
        <Box sx={{ flexGrow: 1, m:9 }} alignSelf='center'>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 3, sm: 6, md: 12 }}>
                {console.log(classes)}
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