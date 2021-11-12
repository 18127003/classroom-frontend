
import { Account, AssignedClassroom, AuthRequestInfo, Classroom, GetClassroomsCriteria } from "@/@types/model"
import { LOCAL_STORAGE_CLASSES_NAME } from "@/constants/common"
import Cookies from "universal-cookie"
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

const joinClassroom = async (code: string)=>{
    return await api.joinClassroom(code)
}

const saveLocal = (item: string, data: any[])=>{
    localStorage.setItem(item, JSON.stringify(data))
}

const saveCookies = (name:string, value:any)=>{
    const cookies = new Cookies();
    cookies.set(name,value,{
        'path':'/',
        'maxAge':3600000
    })
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

const logout = async ()=>{
    return await api.logout();
}

const signup = async (account: Account)=>{
    return await api.signup(account);
}

const socialLogin = async (tokenId: string)=>{
    return await api.socialLogin(tokenId)
}

export const authService = {
    login,
    logout,
    signup,
    socialLogin
}

export const classroomService = {
    getClassrooms,
    addClassroom,
    addClassroomLocal,
    joinClassroom
}

export const commonService = {
    saveLocal,
    saveCookies,
}