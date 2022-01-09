import { adminAction } from "@/constants/actions";
import { Account, Classroom, GetDataCriteria } from "./model";

export interface AdminState {
    admins:{
        data: Account[],
        reload: {
            reload: boolean,
            fetch: boolean
        }
    },
    accounts:{
        data: Account[],
        reload: {
            reload: boolean,
            fetch: boolean
        }
    },
    classrooms:{
        data: Classroom[],
        reload: {
            reload: boolean,
            fetch: boolean
        }
    },
    loading: boolean,
    error: string|null,
    msg: string|null
}

export interface CreateAdminSuccessPayload {
    msg: string;
}

export interface CreateAdminFailPayload{
    error: string
}

export interface CreateAdminRequest {
    type: typeof adminAction.CREATE_ADMIN_REQUEST
    payload: Account
}

export interface CreateAdminSuccess {
    type: typeof adminAction.CREATE_ADMIN_SUCCESS
    payload: CreateAdminSuccessPayload
}

export interface CreateAdminFail {
    type: typeof adminAction.CREATE_ADMIN_FAIL
    payload: CreateAdminFailPayload
}

export interface GetClassroomSuccessPayload {
    classrooms: Classroom[];
}

export interface GetClassroomFailPayload{
    error: string
}

export interface GetClassroomRequest {
    type: typeof adminAction.GET_CLASSROOM_REQUEST
    payload: GetDataCriteria
}

export interface GetClassroomSuccess {
    type: typeof adminAction.GET_CLASSROOM_SUCCESS
    payload: GetClassroomSuccessPayload
}

export interface GetClassroomFail {
    type: typeof adminAction.GET_CLASSROOM_FAIL
    payload: GetClassroomFailPayload
}

export interface GetAccountSuccessPayload {
    accounts: Account[];
}

export interface GetAccountFailPayload{
    error: string
}

export interface GetAccountRequest {
    type: typeof adminAction.GET_ACCOUNT_REQUEST
    payload: GetDataCriteria
}

export interface GetAccountSuccess {
    type: typeof adminAction.GET_ACCOUNT_SUCCESS
    payload: GetAccountSuccessPayload
}

export interface GetAccountFail {
    type: typeof adminAction.GET_ACCOUNT_FAIL
    payload: GetAccountFailPayload
}

export interface GetAdminSuccessPayload {
    admins: Account[];
}

export interface GetAdminFailPayload{
    error: string
}

export interface GetAdminRequest {
    type: typeof adminAction.GET_ADMIN_REQUEST
    payload: GetDataCriteria
}

export interface GetAdminSuccess {
    type: typeof adminAction.GET_ADMIN_SUCCESS
    payload: GetAdminSuccessPayload
}

export interface GetAdminFail {
    type: typeof adminAction.GET_ADMIN_FAIL
    payload: GetAdminFailPayload
}

export type AdminAction = 
    | CreateAdminRequest
    | CreateAdminSuccess
    | CreateAdminFail
    | GetClassroomRequest
    | GetClassroomSuccess
    | GetClassroomFail
    | GetAccountRequest
    | GetAccountSuccess
    | GetAccountFail
    | GetAdminRequest
    | GetAdminSuccess
    | GetAdminFail

