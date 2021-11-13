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
    error: string|null,
    loggedOut: boolean
}

export interface AuthRequest{
    type: typeof authActions.LOGIN_REQUEST
    payload: AuthRequestInfo
}

export interface SocialAuthRequest{
    type: typeof authActions.SOCIAL_LOGIN_REQUEST
    payload: string // tokenId string
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

export interface LogoutFailPayload{
    error: string
}

export interface LogoutRequest{
    type: typeof authActions.LOGOUT_REQUEST
}

export interface LogoutSuccess {
    type: typeof authActions.LOGOUT_SUCCESS
}

export interface LogoutFail {
    type: typeof authActions.LOGOUT_FAIL
    payload: LogoutFailPayload
}

export interface SignupFailPayload{
    error: string
}

export interface SignupRequest{
    type: typeof authActions.SIGNUP_REQUEST
    payload: Account
}

export interface SignupSuccess {
    type: typeof authActions.SIGNUP_SUCCESS
}

export interface SignupFail {
    type: typeof authActions.SIGNUP_FAIL
    payload: SignupFailPayload
}

type SignupAction = 
    | SignupRequest
    | SignupSuccess
    | SignupFail

type LoginAction = 
    | SocialAuthRequest
    | AuthRequest
    | AuthSuccess
    | AuthFail
    | AuthRefresh

type LogoutAction = 
    | LogoutRequest
    | LogoutSuccess
    | LogoutFail

export type AuthAction = LoginAction | LogoutAction | SignupAction
    