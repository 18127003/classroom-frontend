import { accountAction } from "@/constants/actions";
import { Account, ChangePasswordRequestInfo, StudentInfo } from "./model";

export interface AccountState {
    loading: boolean,
    detail: Account|null,
    error: string|null,
    msg: string|null
}

export interface AccountFailPayload{
    error: string
}

export interface MsgPayload {
    msg: string
}

export interface UpdateSuccessPayload extends MsgPayload {
    user: Account;
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
    payload: AccountFailPayload
}

export interface ChangePasswordRequest {
    type: typeof accountAction.UPDATE_PASSWORD_REQUEST
    payload: ChangePasswordRequestInfo
}

export interface ChangePasswordSuccess {
    type: typeof accountAction.UPDATE_PASSWORD_SUCCESS,
    payload: MsgPayload
}

export interface ChangePasswordFail {
    type: typeof accountAction.UPDATE_PASSWORD_FAIL
    payload: AccountFailPayload
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

export interface UpdateStudentIdSuccessPayload extends MsgPayload{
    studentId: string;
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
    payload: AccountFailPayload
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
