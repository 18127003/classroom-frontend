import { accountAction } from "@/constants/actions";
import { Account, ChangePasswordRequestInfo, StudentInfo } from "./model";

export interface AccountState {
    loading: boolean,
    detail: Account|null,
    error: string|null,
}

export interface UpdateSuccessPayload {
    user: Account;
}

export interface UpdateFailPayload{
    error: string
}

export interface UpdateRequest {
    type: typeof accountAction.UPDATE_ACCOUNT_REQUEST
    payload: Account
}

export interface UpdateSuccess {
    type: typeof accountAction.UPDATE_ACCOUNT_SUCCESS
    payload: UpdateSuccessPayload
}

export interface UpdateFail {
    type: typeof accountAction.UPDATE_ACCOUNT_FAIL
    payload: UpdateFailPayload
}

export interface ChangePasswordRequestPayload{
    id: number,
    request: ChangePasswordRequestInfo
}

export interface ChangePasswordFailPayload{
    error: string
}

export interface ChangePasswordRequest {
    type: typeof accountAction.UPDATE_PASSWORD_REQUEST
    payload: ChangePasswordRequestPayload
}

export interface ChangePasswordSuccess {
    type: typeof accountAction.UPDATE_PASSWORD_SUCCESS
}

export interface ChangePasswordFail {
    type: typeof accountAction.UPDATE_PASSWORD_FAIL
    payload: ChangePasswordFailPayload
}

export interface InitAccountRequest {
    type: typeof accountAction.INIT_ACCOUNT_REQUEST
    payload: Account
}

export interface InitAccountSuccessPayload {
    detail: Account;
}

export interface InitAccountSuccess {
    type: typeof accountAction.INIT_ACCOUNT_SUCCESS
    payload: InitAccountSuccessPayload
}

export interface UpdateStudentIdSuccessPayload {
    studentId: string;
}

export interface UpdateStudentIdFailPayload{
    error: string
}

export interface UpdateStudentIdRequest{
    type: typeof accountAction.UPDATE_STUDENTID_REQUEST,
    payload: StudentInfo
}

export interface UpdateStudentIdSuccess {
    type: typeof accountAction.UPDATE_STUDENTID_SUCCESS
    payload: UpdateStudentIdSuccessPayload
}

export interface UpdateStudentIdFail {
    type: typeof accountAction.UPDATE_STUDENTID_FAIL
    payload: UpdateStudentIdFailPayload
}


export type AccountAction = 
    | UpdateRequest
    | UpdateSuccess
    | UpdateFail
    | ChangePasswordFail
    | ChangePasswordRequest
    | ChangePasswordSuccess
    | InitAccountRequest
    | InitAccountSuccess
    | UpdateStudentIdRequest
    | UpdateStudentIdSuccess
    | UpdateStudentIdFail
