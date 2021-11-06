import BasicAppBar from "@/components/BasicAppBar"
import ClassroomsGrid from "@/components/ClassroomsGrid"
import { Account, AssignedClassroom, Classroom } from "@/model/model"
import { getClassrooms, loginUser, saveLocal } from "@/services/service"
import { LinearProgress } from "@mui/material"
import React, { useEffect, useState } from "react"

const HomePage = ()=>{
    const[classes, setClasses]=useState<AssignedClassroom[]>([])
    const[loading, setLoading]=useState(true)
    const[auth, setAuth]=useState<Account|null>(null)

    useEffect(()=>{
        (async ()=>{
            setAuth((await loginUser()).data)
            const data = await getClassrooms(true)
            setClasses(data)
            setLoading(false)
        })()
    },[])

    useEffect(()=>{
        saveLocal("classes",classes)
    },[classes])

    const onClassPreCreate = ()=>{
        setLoading(true)
    }

    const onClassPostCreate = (classroom: AssignedClassroom) => {
        setClasses([
            ...classes,
            classroom
        ])
        setLoading(false)
    }

    return (
        <>
            <BasicAppBar 
                auth={auth}
                onClassPreCreate={onClassPreCreate}
                onClassPostCreate={onClassPostCreate}
            />
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <ClassroomsGrid classes={classes}/>
        </>
    )
}

export default HomePage