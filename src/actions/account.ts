import { AccountFailPayload, ChangePasswordFail, ChangePasswordRequest, ChangePasswordSuccess, InitAccountRequest, 
    InitAccountSuccess, InitAccountSuccessPayload, UpdateFail, UpdateRequest, UpdateStudentIdFail,
     UpdateStudentIdRequest, UpdateStudentIdSuccess, UpdateStudentIdSuccessPayload, UpdateSuccess, 
    UpdateSuccessPayload } from "@/@types/account.action";
import { Account, ChangePasswordRequestInfo, StudentInfo } from "@/@types/model";
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

export const updateFail = (payload: AccountFailPayload):UpdateFail =>({
    type: accountAction.UPDATE_ACCOUNT_FAIL,
    payload: payload
});
 
function* updateAccountSaga(action: UpdateRequest) {
    try{
        const user = yield call(accountService.updateAccount, action.payload);
        commonService.saveCookies(COOKIES_AUTH_NAME, user.data);
        yield put(updateSuccess({
            user: user.data,
            msg: 'Update profile succeed'
        }))
    } catch (e){
        yield put(updateFail({
            error: 'Update account failed'
        }))
    }  
}

export const changePasswordRequest = (payload: ChangePasswordRequestInfo): ChangePasswordRequest => ({
    type: accountAction.UPDATE_PASSWORD_REQUEST,
    payload: payload
});

export const changePasswordSuccess = (msg: string):ChangePasswordSuccess =>({
    type: accountAction.UPDATE_PASSWORD_SUCCESS,
    payload: {msg}
});

export const changePasswordFail = (payload: AccountFailPayload):ChangePasswordFail =>({
    type: accountAction.UPDATE_PASSWORD_FAIL,
    payload: payload
});
 
function* changePasswordSaga(action: ChangePasswordRequest) {
    try{
        yield call(accountService.changePassword, action.payload);
        yield put(changePasswordSuccess('Change password succeed'))
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

export const updateStudentIdRequest = (studentInfo: StudentInfo): UpdateStudentIdRequest => ({
    type: accountAction.UPDATE_STUDENTID_REQUEST,
    payload: studentInfo
});

export const updateStudentIdSuccess = (payload: UpdateStudentIdSuccessPayload):UpdateStudentIdSuccess =>({
    type: accountAction.UPDATE_STUDENTID_SUCCESS,
    payload: payload
});

export const updateStudentIdFail = (payload: AccountFailPayload):UpdateStudentIdFail =>({
    type: accountAction.UPDATE_STUDENTID_FAIL,
    payload: payload
});
 
function* updateStudentIdSaga(action: UpdateStudentIdRequest) {
    try {
        yield call(accountService.updateStudentId, action.payload)
        yield put(updateStudentIdSuccess({
            studentId: action.payload.studentId,
            msg: 'Update student ID succeed'
        }))
    } catch (e){
        yield put(updateStudentIdFail({
            error: 'Update student ID failed'
        }))
    }
}

export function* accountSaga() {
    yield all([
        takeLatest(accountAction.UPDATE_ACCOUNT_REQUEST, updateAccountSaga),
        takeLatest(accountAction.UPDATE_PASSWORD_REQUEST, changePasswordSaga),
        takeLatest(accountAction.INIT_ACCOUNT_REQUEST, initAccountSaga),
        takeLatest(accountAction.UPDATE_STUDENTID_REQUEST, updateStudentIdSaga)
    ]);
}


export default accountSaga;