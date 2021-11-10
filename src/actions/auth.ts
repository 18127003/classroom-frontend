import { AuthRequestInfo } from "@/@types/model";
import { userService } from "@/services";
import { useCookies } from "react-cookie";
import { authActions } from "../constants/actions";
import {all, call, put, takeLatest} from "redux-saga/effects";
import { AuthSuccessPayload, AuthSuccess, AuthFailPayload, AuthFail, AuthAction, AuthRequest } from "@/@types/auth.action";
import { COOKIES_AUTH_NAME } from "@/constants/common";


export const loginRequest = (auth: AuthRequestInfo) => ({
    type: authActions.LOGIN_REQUEST,
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
 
function* loginSaga(action: AuthAction) {
    try{
        const user = yield call(userService.login, (action as AuthRequest).payload);
        userService.saveCookies(COOKIES_AUTH_NAME, user.data);
        yield put(loginSuccess({
            user: user.data
        }))
    } catch (e){
        yield put(loginFail({
            error: 'Login failed'
        }))
    }  
}

export function* authSaga() {
    yield all([takeLatest(authActions.LOGIN_REQUEST, loginSaga)]);
}

export default authSaga;

