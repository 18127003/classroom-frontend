import { ChangePasswordFail, ChangePasswordFailPayload, ChangePasswordRequest, ChangePasswordRequestPayload, ChangePasswordSuccess, InitAccountRequest, InitAccountSuccess, InitAccountSuccessPayload, UpdateFail, UpdateFailPayload, UpdateRequest, UpdateSuccess, UpdateSuccessPayload } from "@/@types/account.action";
import { Account } from "@/@types/model";
import { accountAction } from "@/constants/actions";
import { COOKIES_AUTH_NAME } from "@/constants/common";
import { accountService, commonService } from "@/services";
import { all, call, put, takeLatest } from "@redux-saga/core/effects";

export const updateRequest = (account: Account): UpdateRequest => ({
    type: accountAction.UPDATE_ACCOUNT_REQUEST,
    payload: account
});

export const updateSuccess = (payload: UpdateSuccessPayload):UpdateSuccess =>({
    type: accountAction.UPDATE_ACCOUNT_SUCCESS,
    payload: payload
});

export const updateFail = (payload: UpdateFailPayload):UpdateFail =>({
    type: accountAction.UPDATE_ACCOUNT_FAIL,
    payload: payload
});
 
function* updateAccountSaga(action: UpdateRequest) {
    try{
        const user = yield call(accountService.updateAccount, action.payload);
        commonService.saveCookies(COOKIES_AUTH_NAME, user.data);
        yield put(updateSuccess({
            user: user.data
        }))
    } catch (e){
        yield put(updateFail({
            error: 'Update account failed'
        }))
    }  
}

export const changePasswordRequest = (payload: ChangePasswordRequestPayload): ChangePasswordRequest => ({
    type: accountAction.UPDATE_PASSWORD_REQUEST,
    payload: payload
});

export const changePasswordSuccess = ():ChangePasswordSuccess =>({
    type: accountAction.UPDATE_PASSWORD_SUCCESS
});

export const changePasswordFail = (payload: ChangePasswordFailPayload):ChangePasswordFail =>({
    type: accountAction.UPDATE_PASSWORD_FAIL,
    payload: payload
});
 
function* changePasswordSaga(action: ChangePasswordRequest) {
    try{
        yield call(accountService.changePassword, action.payload.id, action.payload.request);
        yield put(changePasswordSuccess())
    } catch (e){
        yield put(changePasswordFail({
            error: 'Change password failed'
        }))
    }  
}

export const initAccountRequest = (account: Account): InitAccountRequest => ({
    type: accountAction.INIT_ACCOUNT_REQUEST,
    payload: account
});

export const initAccountSuccess = (payload: InitAccountSuccessPayload): InitAccountSuccess => ({
    type: accountAction.INIT_ACCOUNT_SUCCESS,
    payload: payload
});

function* initAccountSaga(action: InitAccountRequest) {
     yield put(initAccountSuccess({
         detail: action.payload
     }))
}

export function* accountSaga() {
    yield all([
        takeLatest(accountAction.UPDATE_ACCOUNT_REQUEST, updateAccountSaga),
        takeLatest(accountAction.UPDATE_PASSWORD_REQUEST, changePasswordSaga),
        takeLatest(accountAction.INIT_ACCOUNT_REQUEST, initAccountSaga),
    ]);
}


export default accountSaga;