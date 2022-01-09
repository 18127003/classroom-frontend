import { Account } from "@/@types/model";
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

export const adminApi = {
    adminSignup,
    getAllAccount,
    getAllClassroom,
    getAllAdmin
}