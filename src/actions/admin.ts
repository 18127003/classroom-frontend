import { CreateAdminFail, CreateAdminFailPayload, CreateAdminRequest, CreateAdminSuccess, CreateAdminSuccessPayload, GetAccountFail, GetAccountFailPayload, GetAccountRequest, GetAccountSuccess, GetAccountSuccessPayload, GetAdminFail, GetAdminFailPayload, GetAdminRequest, GetAdminSuccess, GetAdminSuccessPayload, GetClassroomFail, GetClassroomFailPayload, GetClassroomRequest, GetClassroomSuccess, GetClassroomSuccessPayload } from "@/@types/admin.action";
import { Account, GetDataCriteria } from "@/@types/model";
import { adminAction } from "@/constants/actions";
import { adminService } from "@/services/adminService";
import { all, call, put, takeLatest } from "redux-saga/effects";

export const createAdminRequest = (account: Account): CreateAdminRequest => ({
    type: adminAction.CREATE_ADMIN_REQUEST,
    payload: account
});

export const createAdminSuccess = (payload: CreateAdminSuccessPayload):CreateAdminSuccess =>({
    type: adminAction.CREATE_ADMIN_SUCCESS,
    payload
});

export const createAdminFail = (payload: CreateAdminFailPayload):CreateAdminFail =>({
    type: adminAction.CREATE_ADMIN_FAIL,
    payload: payload
});

 
function* createAdminSaga(action: CreateAdminRequest) {
    try{
        const res = yield call(adminService.adminSignup, action.payload)
        yield put(createAdminSuccess({msg: "Request success. Wait for approval."}))
    } catch(e){
        yield put(createAdminFail({
            error: 'Create Admin Failed'
        }))
    }
}

export const getClassroomRequest = (criteria: GetDataCriteria): GetClassroomRequest => ({
    type: adminAction.GET_CLASSROOM_REQUEST,
    payload: criteria
});

export const getClassroomSuccess = (payload: GetClassroomSuccessPayload):GetClassroomSuccess =>({
    type: adminAction.GET_CLASSROOM_SUCCESS,
    payload: payload
});

export const getClassroomFail = (payload: GetClassroomFailPayload):GetClassroomFail =>({
    type: adminAction.GET_CLASSROOM_FAIL,
    payload: payload
});
 
function* getClassroomSaga(action: GetClassroomRequest) {
    const classes = yield call(adminService.getAllClassroom, action.payload);
    if(classes) {
        yield put(getClassroomSuccess({
            classrooms: classes
        }))
    } else {
        yield put(getClassroomFail({
            error: 'Get classroom failed'
        }))
    }
}

export const getAccountRequest = (criteria: GetDataCriteria): GetAccountRequest => ({
    type: adminAction.GET_ACCOUNT_REQUEST,
    payload: criteria
});

export const getAccountSuccess = (payload: GetAccountSuccessPayload):GetAccountSuccess =>({
    type: adminAction.GET_ACCOUNT_SUCCESS,
    payload: payload
});

export const getAccountFail = (payload: GetAccountFailPayload):GetAccountFail =>({
    type: adminAction.GET_ACCOUNT_FAIL,
    payload: payload
});
 
function* getAccountSaga(action: GetAccountRequest) {
    const accounts = yield call(adminService.getAllAccount, action.payload);
    if(accounts) {
        yield put(getAccountSuccess({
            accounts: accounts
        }))
    } else {
        yield put(getAccountFail({
            error: 'Get accounts failed'
        }))
    }
}

export const getAdminRequest = (criteria: GetDataCriteria): GetAdminRequest => ({
    type: adminAction.GET_ADMIN_REQUEST,
    payload: criteria
});

export const getAdminSuccess = (payload: GetAdminSuccessPayload):GetAdminSuccess =>({
    type: adminAction.GET_ADMIN_SUCCESS,
    payload: payload
});

export const getAdminFail = (payload: GetAdminFailPayload):GetAdminFail =>({
    type: adminAction.GET_ADMIN_FAIL,
    payload: payload
});
 
function* getAdminSaga(action: GetAdminRequest) {
    const admins = yield call(adminService.getAllAdmin, action.payload);
    if(admins) {
        yield put(getAdminSuccess({
            admins: admins
        }))
    } else {
        yield put(getAdminFail({
            error: 'Get admins failed'
        }))
    }
}

export function* adminSaga() {
    yield all([
        takeLatest(adminAction.CREATE_ADMIN_REQUEST, createAdminSaga),
        takeLatest(adminAction.GET_CLASSROOM_REQUEST, getClassroomSaga),
        takeLatest(adminAction.GET_ACCOUNT_REQUEST, getAccountSaga),
        takeLatest(adminAction.GET_ADMIN_REQUEST, getAdminSaga)
    ]);
}


export default adminSaga;