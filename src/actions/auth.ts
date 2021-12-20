import { Account, AuthRequestInfo } from "@/@types/model";
import { authService, commonService } from "@/services";
import { authActions } from "../constants/actions";
import {all, call, put, takeLatest} from "redux-saga/effects";
import { AuthSuccessPayload, AuthSuccess, AuthFailPayload, AuthFail, AuthRequest, 
    AuthRefresh, LogoutSuccess, LogoutFail, LogoutFailPayload, SignupSuccess, SignupFailPayload, SignupFail, SignupRequest, SocialAuthRequest } from "@/@types/auth.action";
import { COOKIES_AUTH_NAME } from "@/constants/common";
import { initAccountRequest } from "./account";
import { getClassroomsRequest } from "./classrooms";
import { userInfo } from "os";


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
        let user;
        if(!action.payload.admin){
            user = yield call(authService.login, action.payload);
        } else {
            user = yield call(authService.adminLogin, action.payload);
        }
        commonService.saveCookies(COOKIES_AUTH_NAME, user.data);
        yield put(initAccountRequest(user.data))
        yield put(loginSuccess({
            user: user.data
        }))
        if(user.data.role!=='ADMIN'){
            yield put(getClassroomsRequest({
                reload: true
            }))
        }
    } catch (e){
        yield put(loginFail({
            error: 'Login failed'
        }))
    }  
}

function* refreshLoginSaga(action: AuthRefresh) {
    try{
        yield call(authService.testConnection)
        yield put(initAccountRequest(action.payload))
        yield put(loginSuccess({
            user:action.payload
        }))
        if(action.payload.role!=='ADMIN'){
            yield put(getClassroomsRequest({
                reload: false
            }))
        }
    } catch (e){
        
    }
   
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
    try{
        yield call(authService.logout)
        yield put(logoutSuccess())
    } catch(e){
        yield put(logoutFail({
            error: 'Logout Failed'
        }))
    }
}

export const signupRequest = (account: Account): SignupRequest => ({
    type: authActions.SIGNUP_REQUEST,
    payload: account
});

export const signupSuccess = ():SignupSuccess =>({
    type: authActions.SIGNUP_SUCCESS
});

export const signupFail = (payload: SignupFailPayload):SignupFail =>({
    type: authActions.SIGNUP_FAIL,
    payload: payload
});

 
function* signupSaga(action: SignupRequest) {
    try{
        const res = yield call(authService.signup, action.payload)
        const user: Account = res.data
        yield put(signupSuccess())
        yield put(loginRequest({
            email: user.email,
            password: action.payload.password
        }))
    } catch(e){
        yield put(signupFail({
            error: 'Signup Failed'
        }))
    }
}

export const socialLoginRequest = (tokenId: string) => ({
    type: authActions.SOCIAL_LOGIN_REQUEST,
    payload: tokenId
});

function* socialLoginSaga(action: SocialAuthRequest){
    try{
        const user = yield call(authService.socialLogin, action.payload)
        commonService.saveCookies(COOKIES_AUTH_NAME, user.data);
        yield put(initAccountRequest(user.data))
        yield put(loginSuccess({
            user: user.data
        }))        
        yield put(getClassroomsRequest({
            reload: true
        }))
    } catch(e){
        yield put(loginFail({
            error: 'Login Failed'
        }))
    }
}

export function* authSaga() {
    yield all([
        takeLatest(authActions.LOGIN_REQUEST, loginSaga),
        takeLatest(authActions.LOGIN_REFRESH, refreshLoginSaga),
        takeLatest(authActions.LOGOUT_REQUEST, logoutSaga),
        takeLatest(authActions.SIGNUP_REQUEST, signupSaga),
        takeLatest(authActions.SOCIAL_LOGIN_REQUEST, socialLoginSaga)
    ]);
}


export default authSaga;

