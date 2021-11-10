import BasicAppBar from "@/components/BasicAppBar"
import ClassroomsGrid from "@/components/ClassroomGrid"
import { AssignedClassroom } from "@/@types/model"
import { LinearProgress } from "@mui/material"
import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "@/reducers"
import { Redirect } from "react-router"

const HomePage = ()=>{
    const loading = useSelector((state: AppState)=>state.classrooms.loading);
    const auth = useSelector((state: AppState)=>state.auth.user);


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
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <ClassroomsGrid/>
        </>
    )
}

export default HomePage