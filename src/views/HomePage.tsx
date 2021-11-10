import BasicAppBar from "@/components/BasicAppBar/BasicAppBar"
import ClassroomsGrid from "@/components/ClassroomGrid/ClassroomsGrid"
import { AssignedClassroom } from "@/@types/model"
import { userService } from "@/services/service"
import { LinearProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { AppState } from "@/reducers"
import { Redirect } from "react-router"

const HomePage = ()=>{
    const[classes, setClasses]=useState<AssignedClassroom[]>([])
    const[loading, setLoading]=useState(true)
    const auth = useSelector((state: AppState)=>state.authReducer.user);


    // useEffect(()=>{
    //     (async ()=>{
    //         const data = await userService.getClassrooms(true)
    //         setClasses(data)
    //         setLoading(false)
    //     })()
    // },[])

    // useEffect(()=>{
    //     userService.saveLocal("classes",classes)
    // },[classes])

    const onClassPreCreate = ()=>{
        // setLoading(true)
    }

    const onClassPostCreate = (classroom: AssignedClassroom) => {
        // setClasses([
        //     ...classes,
        //     classroom
        // ])
        // setLoading(false)
    }
    if(auth===null||auth===undefined){
        return <Redirect to="/login"/>
    }
    return (
        <>
            <BasicAppBar
                onClassPreCreate={onClassPreCreate}
                onClassPostCreate={onClassPostCreate}
            />
            {/* <LinearProgress sx={loading?{}:{display: 'none'}}/> */}
            {/* <ClassroomsGrid 
                classes={classes}
            /> */}
        </>
    )
}

export default HomePage