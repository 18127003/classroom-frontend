import { Account, StudentInfo } from "@/@types/model";
import instance, { transformFunc } from "./axios";

const adminSignup=(account:Account)=>instance({
    'method':'POST',
    'url':'/admin/create',
    'data':account,
    transformResponse:[transformFunc]
})

const getAllClassroom = ()=>instance({
    'method':'GET',
    'url':'/admin/classroom/all',
    transformResponse:[transformFunc]
})

const getAllAccount = ()=>instance({
    'method':'GET',
    'url':'/admin/account/all',
    transformResponse:[transformFunc]
})

const getAllAdmin = ()=>instance({
    'method':'GET',
    'url':'/admin/all',
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
    removeStudentId
}