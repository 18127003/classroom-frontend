import BasicAppBar from "@/components/BasicAppBar"
import ClassroomsGrid from "@/components/ClassroomsGrid"
import { Classroom } from "@/model/Classroom"
import { getClassrooms, saveLocal } from "@/services/service"
import { LinearProgress } from "@mui/material"
import React, { useEffect, useState } from "react"

const HomePage = ()=>{
    const[classes, setClasses]=useState<Classroom[]>([])
    const[loading, setLoading]=useState(true)

    useEffect(()=>{
        (async ()=>{
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

    const onClassPostCreate = (classroom: Classroom) => {
        setClasses([
            ...classes,
            classroom
        ])
        setLoading(false)
    }

    return (
        <>
            <BasicAppBar 
                onClassPreCreate={onClassPreCreate}
                onClassPostCreate={onClassPostCreate}
            />
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <ClassroomsGrid classes={classes}/>
        </>
    )
}

export default HomePage