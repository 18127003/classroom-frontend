import { Classroom } from "@/model/model"
import { getClassrooms, loginUser } from "@/services/service"
import React from "react"
import { useEffect, useState } from "react"

interface Account {
    name: string,
    id: number
}

export const LoginPage = ()=>{
    const [auth, setAuth]=useState<Account|null>(null)
    const [classes, setClasses]=useState<Classroom[]>([])
    useEffect(()=>{
        (async()=>{
            setAuth((await loginUser()).data)
            setClasses((await getClassrooms(true)).data)
        })()
    },[])

    
    return (
        <>
            <div>{auth?.name}</div>
            <ul>{
                classes.map((classroom)=>(<li>{classroom.name}</li>))
            }</ul>
        </>
    )
}