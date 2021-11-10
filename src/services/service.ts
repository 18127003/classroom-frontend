
import { AuthRequestInfo, Classroom } from "@/@types/model"
import { api } from "./api"

const getClassrooms = async (forceLoad: boolean) =>{
    let localData = localStorage.getItem("classes")
    if(!localData || forceLoad){
        const res = await api.getData()
        if (res.status===200){
            saveLocal("classes", res.data)
            localData = localStorage.getItem("classes")
        } else {
            return null;
        }
    }
    if(localData){
        return JSON.parse(localData)
    }
    return null;
}

const addClassroom = async (classroom: Classroom)=>{
    return await api.createClassroom(classroom)
}

const saveLocal = (item: string, data: any[])=>{
    localStorage.setItem(item, JSON.stringify(data))
}

const login = async (auth: AuthRequestInfo)=>{
    return await api.login(auth);
}
export const userService = {
    getClassrooms,
    addClassroom,
    saveLocal,
    login
}