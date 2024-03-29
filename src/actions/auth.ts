import { Account, AuthRequestInfo } from "@/@types/model";
import { authService, commonService } from "@/services";
import { authActions } from "../constants/actions";
import {all, call, put, takeLatest} from "redux-saga/effects";
import { AuthSuccessPayload, AuthSuccess, AuthFailPayload, AuthFail, AuthRequest, 
    AuthRefresh, LogoutSuccess, LogoutFail, SignupSuccess, SignupFail, SignupRequest, SocialAuthRequest } from "@/@types/auth.action";
import { COOKIES_AUTH_NAME, LOCAL_REFRESH_TOKEN } from "@/constants/common";
import { initAccountRequest } from "./account";
import { getClassroomsRequest } from "./classrooms";


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
            let res = yield call(authService.login, action.payload);
            commonService.saveLocal(LOCAL_REFRESH_TOKEN, res.data.refreshToken)
            user = res.data.account
        } else {
            let adminRes = yield call(authService.adminLogin, action.payload);
            user = adminRes.data
        }
        commonService.saveCookies(COOKIES_AUTH_NAME, user);
        yield put(initAccountRequest(user))
        
        yield put(loginSuccess({
            user: user
        }))
        if(user && user.role!=='ADMIN'){
            yield put(getClassroomsRequest({
                reload: true
            }))
        }
    } catch (e){
        console.log(e)
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

export const logoutFail = (payload: AuthFailPayload):LogoutFail =>({
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
    yield put(logoutSuccess())
}

export const signupRequest = (account: Account): SignupRequest => ({
    type: authActions.SIGNUP_REQUEST,
    payload: account
});

export const signupSuccess = (msg: string):SignupSuccess =>({
    type: authActions.SIGNUP_SUCCESS,
    payload:{msg}
});

export const signupFail = (payload: AuthFailPayload):SignupFail =>({
    type: authActions.SIGNUP_FAIL,
    payload: payload
});

 
function* signupSaga(action: SignupRequest) {
    try{
        const res = yield call(authService.signup, action.payload)
        const user: Account = res.data
        yield call(authService.sendActivateAccountEmail, user.email)
        yield put(signupSuccess('Account created. Please check your verification email to activate your account'))
        // yield put(loginRequest({
        //     email: user.email,
        //     password: action.payload.password
        // }))
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
        commonService.saveCookies(COOKIES_AUTH_NAME, user.data.account);
        yield put(initAccountRequest(user.data.account))
        commonService.saveLocal(LOCAL_REFRESH_TOKEN, user.data.refreshToken)
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

