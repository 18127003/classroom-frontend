import { AuthRequestInfo } from "@/@types/model";
import { userService } from "@/services/service";
import { useCookies } from "react-cookie";
import { actionConstants } from "./actions.constant";
import {all, call, put, takeLatest} from "redux-saga/effects";
import { AuthSuccessPayload, AuthSuccess, AuthFailPayload, AuthFail, AuthAction, AuthRequest } from "@/@types/action.type";


export const loginRequest = (auth: AuthRequestInfo) => ({
    type: actionConstants.LOGIN_REQUEST,
    payload: auth
});

export const loginSuccess = (payload: AuthSuccessPayload):AuthSuccess =>({
    type: actionConstants.LOGIN_SUCCESS,
    payload: payload
});

export const loginFail = (payload: AuthFailPayload):AuthFail =>({
    type: actionConstants.LOGIN_FAIL,
    payload: payload
});
 
function* loginSaga(action: AuthAction) {
    // const [cookies, setCookies] = useCookies(['user']);
    const user = yield call(userService.login, (action as AuthRequest).payload);
    if(user) {
        // setCookies('user', user.data, {
        //     'path':'/',
        //     'maxAge':3600000
        // })
        yield put(loginSuccess({
            user: user.data
        }))
    } else {
        yield put(loginFail({
            error: 'Login failed'
        }))
    }
}

export function* authSaga() {
    yield all([takeLatest(actionConstants.LOGIN_REQUEST, loginSaga)]);
}

export default authSaga;

