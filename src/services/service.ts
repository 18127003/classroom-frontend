import { Classroom } from "@/model/Classroom"
import { getData, createClassroom } from "./api"

export const getClassrooms = async (forceLoad: boolean) =>{
    let localData = localStorage.getItem("classes")
    if(!localData || forceLoad){
        const res = await getData()
        saveLocal("classes", res.data)
        localData = localStorage.getItem("classes")
    }
    if(localData){
        return JSON.parse(localData)
    }
    return []
}

export const addClassroom = async (classroom: Classroom)=>{
    return await createClassroom(classroom)
}

export const saveLocal = (item: string, data: any[])=>{
    localStorage.setItem(item, JSON.stringify(data))
}