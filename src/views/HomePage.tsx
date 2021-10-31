import BasicAppBar from "@/components/BasicAppBar"
import ClassroomsGrid from "@/components/ClassroomsGrid"
import { Classroom } from "@/model/Classroom"
import { getData } from "@/services/api"
import React, { useEffect, useState } from "react"

const HomePage = ()=>{
    const[classes, setClasses]=useState<Classroom[]>([])

    useEffect(()=>{
        if (classes.length===0){
            (async ()=>{
                let res = await getData()
                setClasses(res.data)
            })()
        }
    },[])

    return (
        <>
            <BasicAppBar/>
            <ClassroomsGrid classes={classes}/>
        </>
    )
}

export default HomePage