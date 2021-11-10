import { actionConstants } from "@/actions/actions.constant";
import { Account, AuthRequestInfo } from "./model";

export interface AuthSuccessPayload {
    user: Account;
}

export interface AuthFailPayload{
    error: string
}

export interface AuthState {
    loading: boolean,
    user: Account|null,
    error: string|null
}

export interface AuthRequest{
    type: typeof actionConstants.LOGIN_REQUEST
    payload: AuthRequestInfo
}

export interface AuthSuccess {
    type: typeof actionConstants.LOGIN_SUCCESS
    payload: AuthSuccessPayload
}

export interface AuthFail {
    type: typeof actionConstants.LOGIN_FAIL
    payload: AuthFailPayload
}

export type AuthAction = 
    | AuthRequest
    | AuthSuccess
    | AuthFail