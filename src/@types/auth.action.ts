import { authActions } from "@/constants/actions";
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
    type: typeof authActions.LOGIN_REQUEST
    payload: AuthRequestInfo
}

export interface AuthRefresh {
    type: typeof authActions.LOGIN_REFRESH
    payload: Account
}

export interface AuthSuccess {
    type: typeof authActions.LOGIN_SUCCESS
    payload: AuthSuccessPayload
}

export interface AuthFail {
    type: typeof authActions.LOGIN_FAIL
    payload: AuthFailPayload
}

export type AuthAction = 
    | AuthRequest
    | AuthSuccess
    | AuthFail
    | AuthRefresh