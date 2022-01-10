import { Account, StudentInfo } from "@/@types/model";
import instance, { transformFunc } from "./axios";

const adminSignup=(account:Account)=>instance({
    'method':'POST',
    'url':'/admin/create',
    'data':account,
    transformResponse:[transformFunc]
})

const getAllClassroom = (desc:boolean, q:string)=>instance({
    'method':'GET',
    'url':`/admin/classroom/all?desc=${desc}&q=${q}`,
    transformResponse:[transformFunc]
})

const getAllAccount = (desc:boolean, q:string)=>instance({
    'method':'GET',
    'url':`/admin/account/all?desc=${desc}&q=${q}`,
    transformResponse:[transformFunc]
})

const getAllLockedAccount = (desc:boolean, q:string)=>instance({
    'method':'GET',
    'url':`/admin/account/locked/all?desc=${desc}&q=${q}`,
    transformResponse:[transformFunc]
})

const getAllAdmin = (desc:boolean, q:string)=>instance({
    'method':'GET',
    'url':`/admin/all?desc=${desc}&q=${q}`,
    transformResponse:[transformFunc]
})

const activateAdmin = (email: string)=>instance({
    'method':'PATCH',
    'url':`admin/activate?email=${email}`
})

const lockAccount = (accountId: string)=>instance({
    'method':'POST',
    'url':`admin/account/${accountId}/lock`
})

const unlockAccount = (accountId: string)=>instance({
    'method':'DELETE',
    'url':`admin/account/${accountId}/unlock`
})

const mapStudentId = (accountId: string, studentInfo: StudentInfo)=>instance({
    'method':'PUT',
    'url':`admin/account/${accountId}/studentId/map`,
    'data': studentInfo
})

const removeStudentId = (accountId: string)=>instance({
    'method':'PUT',
    'url':`admin/account/${accountId}/studentId/remove`
})

export const adminApi = {
    adminSignup,
    getAllAccount,
    getAllClassroom,
    getAllAdmin,
    activateAdmin,
    lockAccount,
    unlockAccount,
    mapStudentId,
    removeStudentId,
    getAllLockedAccount
}