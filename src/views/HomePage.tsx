import BasicAppBar from "@/components/BasicAppBar"
import ClassroomsGrid from "@/components/ClassroomGrid"
import { LinearProgress } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "@/reducers"

const HomePage = ()=>{
    const loading = useSelector((state: AppState)=>state.classrooms.loading);
    return (
        <>
            <BasicAppBar/>
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <ClassroomsGrid/>
        </>
    )
}

export default HomePage