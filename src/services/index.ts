
import { Account, AssignedClassroom, AuthRequestInfo, ChangePasswordRequestInfo, Classroom, GetClassroomsCriteria, InvitationRequestInfo, JoinRequestInfo } from "@/@types/model"
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

const joinClassroom = async (request: JoinRequestInfo)=>{
    return await api.joinClassroom(request.code, request.role)
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

const getParticipants = async (classId: number)=>{
    return await api.getParticipants(classId)
}

const getClassroomDetail = async (classId: number)=>{
    try{
        const res = await api.getClassroomDetail(classId)
        return res.data
    } catch(e){
        return null;
    }
}

const sendInvitationMail = async (request: InvitationRequestInfo)=>{
    await api.sendInvitationMail(request.classId, request.invitations, request.role)
}

const updateAccount = async (account: Account)=>{
    return await api.updateAccount(account.id, account)
}

const changePassword = async (id:number, request: ChangePasswordRequestInfo)=>{
    return await api.changePassword(id, request)
}

export const authService = {
    login,
    logout,
    signup,
    socialLogin
}

export const accountService = {
    updateAccount,
    changePassword
}

export const classroomService = {
    getClassrooms,
    addClassroom,
    addClassroomLocal,
    joinClassroom,
    getParticipants,
    getClassroomDetail,
    sendInvitationMail
}

export const commonService = {
    saveLocal,
    saveCookies,
}