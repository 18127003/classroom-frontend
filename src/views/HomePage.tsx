import BasicAppBar from "@/components/BasicAppBar"
import ClassroomsGrid from "@/components/ClassroomsGrid"
import { Classroom } from "@/model/Classroom"
import { getClassrooms } from "@/services/service"
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

    const onClassCreate = (classroom: Classroom) => {
        setLoading(true);
        (async ()=>{
            const data = await getClassrooms(true)
            setClasses(data)
            setLoading(false)
        })()
    }

    return (
        <>
            <BasicAppBar onClassCreate={onClassCreate}/>
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <ClassroomsGrid classes={classes}/>
        </>
    )
}

export default HomePage