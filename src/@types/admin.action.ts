import { adminAction } from "@/constants/actions";
import { Account, Classroom, GetDataCriteria, StudentInfo } from "./model";

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
    locks: {
        data: Account[],
        reload: {
            reload: boolean,
            fetch: boolean
        }
    }
    loading: boolean,
    error: string|null,
    msg: string|null
}

export interface AdminFailPayload {
    error: string
}

export interface MsgSuccessPayload {
    msg: string
}

export interface CreateAdminSuccessPayload {
    msg: string;
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
    payload: AdminFailPayload
}

export interface GetClassroomSuccessPayload {
    classrooms: Classroom[];
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
    payload: AdminFailPayload
}

export interface GetAccountSuccessPayload {
    accounts: Account[];
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
    payload: AdminFailPayload
}

export interface GetAdminSuccessPayload {
    admins: Account[];
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
    payload: AdminFailPayload
}

export interface EditAdminSuccessPayload extends MsgSuccessPayload {
    admins: Account[]
}

export interface ActivateAdminRequest {
    type: typeof adminAction.ACTIVATE_ADMIN_REQUEST
    payload: string //email
}

export interface ActivateAdminSuccess {
    type: typeof adminAction.ACTIVATE_ADMIN_SUCCESS
    payload: EditAdminSuccessPayload
}

export interface ActivateAdminFail {
    type: typeof adminAction.ACTIVATE_ADMIN_FAIL
    payload: AdminFailPayload
}

export interface EditAccountSuccessPayload extends MsgSuccessPayload {
    accounts: Account[]
}

export interface LockAccountRequest {
    type: typeof adminAction.LOCK_ACCOUNT_REQUEST
    payload: string // accountId
}

export interface LockAccountSuccess {
    type: typeof adminAction.LOCK_ACCOUNT_SUCCESS
    payload: EditAccountSuccessPayload
}

export interface LockAccountFail {
    type: typeof adminAction.LOCK_ACCOUNT_FAIL
    payload: AdminFailPayload
}

export interface UnlockAccountRequest {
    type: typeof adminAction.UNLOCK_ACCOUNT_REQUEST
    payload: string // accountId
}

export interface UnlockAccountSuccess {
    type: typeof adminAction.UNLOCK_ACCOUNT_SUCCESS
    payload: EditAccountSuccessPayload
}

export interface UnlockAccountFail {
    type: typeof adminAction.UNLOCK_ACCOUNT_FAIL
    payload: AdminFailPayload
}

export interface MapStudentIdRequest {
    type: typeof adminAction.MAP_STUDENT_ID_REQUEST
    payload: {
        accountId: string,
        studentInfo: StudentInfo
    }
}

export interface MapStudentIdSuccess {
    type: typeof adminAction.MAP_STUDENT_ID_SUCCESS
    payload: EditAccountSuccessPayload
}

export interface MapStudentIdFail {
    type: typeof adminAction.MAP_STUDENT_ID_FAIL
    payload: AdminFailPayload
}

export interface RemoveStudentIdRequest {
    type: typeof adminAction.REMOVE_STUDENT_ID_REQUEST
    payload: string // accountId
}

export interface RemoveStudentIdSuccess {
    type: typeof adminAction.REMOVE_STUDENT_ID_SUCCESS
    payload: EditAccountSuccessPayload
}

export interface RemoveStudentIdFail {
    type: typeof adminAction.REMOVE_STUDENT_ID_FAIL
    payload: AdminFailPayload
}

export interface GetLockSuccessPayload {
    locks: Account[]
}

export interface GetLockRequest {
    type: typeof adminAction.GET_LOCK_REQUEST
    payload: GetDataCriteria
}

export interface GetLockSuccess {
    type: typeof adminAction.GET_LOCK_SUCCESS
    payload: GetLockSuccessPayload
}

export interface GetLockFail {
    type: typeof adminAction.GET_LOCK_FAIL
    payload: AdminFailPayload
}

export interface ReloadAccountRequest{
    type: typeof adminAction.RELOAD_ACCOUNT_REQUEST,
    payload: {
        fetch: boolean
    }
}

export interface ReloadLockRequest{
    type: typeof adminAction.RELOAD_LOCK_REQUEST,
    payload: {
        fetch: boolean
    }
}

type AccountAction = 
    | GetAccountRequest
    | GetAccountSuccess
    | GetAccountFail
    | LockAccountRequest
    | LockAccountSuccess
    | LockAccountFail
    | MapStudentIdRequest
    | MapStudentIdFail
    | MapStudentIdSuccess
    | UnlockAccountRequest
    | UnlockAccountSuccess
    | UnlockAccountFail
    | RemoveStudentIdRequest
    | RemoveStudentIdSuccess
    | RemoveStudentIdFail
    | GetLockRequest
    | GetLockSuccess
    | GetLockFail
    | ReloadAccountRequest
    | ReloadLockRequest

export type AdminAction = 
    | CreateAdminRequest
    | CreateAdminSuccess
    | CreateAdminFail
    | GetClassroomRequest
    | GetClassroomSuccess
    | GetClassroomFail
    | ActivateAdminRequest
    | ActivateAdminSuccess
    | ActivateAdminFail
    | GetAdminRequest
    | GetAdminSuccess
    | GetAdminFail
    | AccountAction

