import { Account, AuthRequestInfo } from "@/@types/model";
import { authService, commonService } from "@/services";
import { authActions } from "../constants/actions";
import {all, call, put, takeLatest} from "redux-saga/effects";
import { AuthSuccessPayload, AuthSuccess, AuthFailPayload, AuthFail, AuthRequest, 
    AuthRefresh, LogoutSuccess, LogoutFail, LogoutFailPayload } from "@/@types/auth.action";
import { COOKIES_AUTH_NAME } from "@/constants/common";


export const loginRequest = (auth: AuthRequestInfo) => ({
    type: authActions.LOGIN_REQUEST,
    payload: auth
});

export const loginRefresh = (auth: Account) => ({
    type: authActions.LOGIN_REFRESH,
    payload: auth
});

export const loginSuccess = (payload: AuthSuccessPayload):AuthSuccess =>({
    type: authActions.LOGIN_SUCCESS,
    payload: payload
});

export const loginFail = (payload: AuthFailPayload):AuthFail =>({
    type: authActions.LOGIN_FAIL,
    payload: payload
});
 
function* loginSaga(action: AuthRequest) {
    try{
        const user = yield call(authService.login, action.payload);
        commonService.saveCookies(COOKIES_AUTH_NAME, user.data);
        yield put(loginSuccess({
            user: user.data
        }))
    } catch (e){
        yield put(loginFail({
            error: 'Login failed'
        }))
    }  
}

function* refreshLoginSaga(action: AuthRefresh) {
    yield put(loginSuccess({
        user:action.payload
    }))
}

export const logoutRequest = () => ({
    type: authActions.LOGOUT_REQUEST
});

export const logoutSuccess = ():LogoutSuccess =>({
    type: authActions.LOGOUT_SUCCESS
});

export const logoutFail = (payload: LogoutFailPayload):LogoutFail =>({
    type: authActions.LOGOUT_FAIL,
    payload: payload
});

 
function* logoutSaga() {
    yield put(logoutSuccess())
}

export function* authSaga() {
    yield all([
        takeLatest(authActions.LOGIN_REQUEST, loginSaga),
        takeLatest(authActions.LOGIN_REFRESH, refreshLoginSaga),
        takeLatest(authActions.LOGOUT_REQUEST, logoutSaga)
    ]);
}


export default authSaga;

