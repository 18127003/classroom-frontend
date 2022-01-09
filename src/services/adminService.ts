import { Account, GetDataCriteria, StudentInfo } from "@/@types/model"
import { LOCAL_STORAGE_ACCOUNTS_NAME, LOCAL_STORAGE_ADMINS_NAME, LOCAL_STORAGE_CLASSES_NAME } from "@/constants/common"
import { commonService } from "."
import { adminApi } from "./adminApi"

const adminSignup= async (account:Account)=>{
    return await adminApi.adminSignup(account)
}

const getAllClassroom = async (criteria: GetDataCriteria) =>{
    return await getData(criteria, LOCAL_STORAGE_CLASSES_NAME, adminApi.getAllClassroom)
}

const getAllAccount = async (criteria: GetDataCriteria) =>{
    return await getData(criteria, LOCAL_STORAGE_ACCOUNTS_NAME, adminApi.getAllAccount)
}

const getAllAdmin = async (criteria: GetDataCriteria) =>{
    return await getData(criteria, LOCAL_STORAGE_ADMINS_NAME, adminApi.getAllAdmin)
}

const activateAdmin = async (email: string)=>{
    await adminApi.activateAdmin(email)
}

const lockAccount = async (accountId: string)=>{
    await adminApi.lockAccount(accountId)
}

const unlockAccount = async (accountId: string)=>{
    await adminApi.unlockAccount(accountId)
}

const mapStudentId =async (accountId:string, studentInfo: StudentInfo) => {
    await adminApi.mapStudentId(accountId, studentInfo)
}

const removeStudentId =async (accountId:string) => {
    await adminApi.removeStudentId(accountId)
}

const getData = async (criteria: GetDataCriteria, localStorageName: string, func: any) =>{
    let localData = localStorage.getItem(localStorageName)
    if(!localData || criteria.reload){
        try {
            const res = await func()
            commonService.saveLocal(localStorageName, res.data)
            localData = localStorage.getItem(localStorageName)
        } catch(e){
            return null;
        }
    }
    if(localData){
        return JSON.parse(localData)
    }
    return null;
}

export const adminService = {
    adminSignup,
    getAllClassroom,
    getAllAccount,
    getAllAdmin,
    activateAdmin,
    lockAccount,
    unlockAccount,
    mapStudentId,
    removeStudentId
}