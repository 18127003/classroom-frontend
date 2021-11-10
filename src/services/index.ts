
import { AssignedClassroom, AuthRequestInfo, Classroom, GetClassroomsCriteria } from "@/@types/model"
import { LOCAL_STORAGE_CLASSES_NAME } from "@/constants/common"
import { api } from "./api"

const getClassrooms = async (criteria: GetClassroomsCriteria) =>{
    let localData = localStorage.getItem(LOCAL_STORAGE_CLASSES_NAME)
    if(!localData || criteria.reload){
        const res = await api.getData()
        if (res.status===200){
            saveLocal(LOCAL_STORAGE_CLASSES_NAME, res.data)
            localData = localStorage.getItem(LOCAL_STORAGE_CLASSES_NAME)
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

const addClassroomLocal = (classroom: AssignedClassroom)=>{
    let newData: AssignedClassroom[] = []
    let localData = localStorage.getItem(LOCAL_STORAGE_CLASSES_NAME)
    if (localData){
        newData = JSON.parse(localData)
    }
    newData.push(classroom)
    saveLocal(LOCAL_STORAGE_CLASSES_NAME, newData)
}

const login = async (auth: AuthRequestInfo)=>{
    return await api.login(auth);
}
export const userService = {
    getClassrooms,
    addClassroom,
    saveLocal,
    addClassroomLocal,
    login
}