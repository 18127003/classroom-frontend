import { ActivateAdminFail, ActivateAdminRequest, ActivateAdminSuccess, AdminFailPayload, CreateAdminFail, CreateAdminRequest, CreateAdminSuccess, CreateAdminSuccessPayload, EditAccountSuccessPayload, EditAdminSuccessPayload, GetAccountFail, GetAccountRequest, 
    GetAccountSuccess, GetAccountSuccessPayload, GetAdminFail, GetAdminRequest, GetAdminSuccess, GetAdminSuccessPayload, 
    GetClassroomFail, GetClassroomRequest, GetClassroomSuccess, GetClassroomSuccessPayload, GetLockFail, GetLockRequest, GetLockSuccess, GetLockSuccessPayload, LockAccountFail, LockAccountRequest, LockAccountSuccess, MapStudentIdRequest, MapStudentIdSuccess, ReloadAccountRequest, ReloadLockRequest, RemoveStudentIdFail, RemoveStudentIdRequest, RemoveStudentIdSuccess, UnlockAccountFail, 
    UnlockAccountRequest, UnlockAccountSuccess } from "@/@types/admin.action";
import { Account, GetDataCriteria, StudentInfo } from "@/@types/model";
import { adminAction } from "@/constants/actions";
import { AppState } from "@/reducers";
import { adminService } from "@/services/adminService";
import { all, call, put, select, takeEvery, takeLatest } from "redux-saga/effects";

export const createAdminRequest = (account: Account): CreateAdminRequest => ({
    type: adminAction.CREATE_ADMIN_REQUEST,
    payload: account
});

export const createAdminSuccess = (payload: CreateAdminSuccessPayload):CreateAdminSuccess =>({
    type: adminAction.CREATE_ADMIN_SUCCESS,
    payload
});

export const createAdminFail = (payload: AdminFailPayload):CreateAdminFail =>({
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

export const getClassroomFail = (payload: AdminFailPayload):GetClassroomFail =>({
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

export const getAccountFail = (payload: AdminFailPayload):GetAccountFail =>({
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

export const getLockRequest = (criteria: GetDataCriteria): GetLockRequest => ({
    type: adminAction.GET_LOCK_REQUEST,
    payload: criteria
});

export const getLockSuccess = (payload: GetLockSuccessPayload):GetLockSuccess =>({
    type: adminAction.GET_LOCK_SUCCESS,
    payload: payload
});

export const getLockFail = (payload: AdminFailPayload):GetLockFail =>({
    type: adminAction.GET_LOCK_FAIL,
    payload: payload
});
 
function* getLockSaga(action: GetLockRequest) {
    const accounts = yield call(adminService.getAllAccount, action.payload);
    if(accounts) {
        yield put(getLockSuccess({
            locks: accounts
        }))
    } else {
        yield put(getAccountFail({
            error: 'Get locked accounts failed'
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

export const getAdminFail = (payload: AdminFailPayload):GetAdminFail =>({
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

export const activateAdminRequest = (email: string): ActivateAdminRequest => ({
    type: adminAction.ACTIVATE_ADMIN_REQUEST,
    payload: email
});

export const activateAdminSuccess = (payload: EditAdminSuccessPayload):ActivateAdminSuccess =>({
    type: adminAction.ACTIVATE_ADMIN_SUCCESS,
    payload: payload
});

export const activateAdminFail = (payload: AdminFailPayload):ActivateAdminFail =>({
    type: adminAction.ACTIVATE_ADMIN_FAIL,
    payload: payload
});
 
function* activateAdminSaga(action: ActivateAdminRequest) {
    try {
        yield call(adminService.activateAdmin, action.payload);
        let admins: Account[] = yield select((state: AppState)=>state.admin.admins.data)
        let index = admins.findIndex(admin=>admin.email===action.payload)
        let activated: Account = {
            ...admins[index],
            status: 'ACTIVATED'
        }
        yield put(activateAdminSuccess({
            admins: [
                ...admins.slice(0, index),
                activated,
                ...admins.slice(index+1)
            ],
            msg: 'Activate admin succeed'
        }))
    } catch (e){
        yield put(activateAdminFail({
            error: 'Activate admin failed'
        }))
    }
}

export const lockAccountRequest = (accountId: string): LockAccountRequest => ({
    type: adminAction.LOCK_ACCOUNT_REQUEST,
    payload: accountId
});

export const lockAccountSuccess = (payload: EditAccountSuccessPayload):LockAccountSuccess =>({
    type: adminAction.LOCK_ACCOUNT_SUCCESS,
    payload: payload
});

export const lockAccountFail = (payload: AdminFailPayload):LockAccountFail =>({
    type: adminAction.LOCK_ACCOUNT_FAIL,
    payload: payload
});


export const reloadAccountRequest = (fetch: boolean): ReloadAccountRequest => ({
    type: adminAction.RELOAD_ACCOUNT_REQUEST,
    payload: {
        fetch: fetch
    }
});


export const reloadLockRequest = (fetch: boolean): ReloadLockRequest => ({
    type: adminAction.RELOAD_LOCK_REQUEST,
    payload: {
        fetch: fetch
    }
});
 
function* lockAccountSaga(action: LockAccountRequest) {
    try {
        yield call(adminService.lockAccount, action.payload);
        let accounts: Account[] = yield select((state: AppState)=>state.admin.accounts.data)
        let index = accounts.findIndex(account=>account.id===action.payload)

        yield put(lockAccountSuccess({
            accounts: [
                ...accounts.splice(index, 1)
            ],
            msg: 'Lock account succeed'
        }))

        yield put(reloadLockRequest(true))
    } catch (e){
        yield put(lockAccountFail({
            error: 'Lock account failed'
        }))
    }
}

export const unlockAccountRequest = (accountId: string): UnlockAccountRequest => ({
    type: adminAction.UNLOCK_ACCOUNT_REQUEST,
    payload: accountId
});

export const unlockAccountSuccess = (payload: EditAccountSuccessPayload):UnlockAccountSuccess =>({
    type: adminAction.UNLOCK_ACCOUNT_SUCCESS,
    payload: payload
});

export const unlockAccountFail = (payload: AdminFailPayload):UnlockAccountFail =>({
    type: adminAction.UNLOCK_ACCOUNT_FAIL,
    payload: payload
});
 
function* unlockAccountSaga(action: UnlockAccountRequest) {
    try {
        yield call(adminService.unlockAccount, action.payload);
        let locks: Account[] = yield select((state: AppState)=>state.admin.locks.data)
        let index = locks.findIndex(account=>account.id===action.payload)

        yield put(unlockAccountSuccess({
            accounts: [
                ...locks.splice(index, 1)
            ],
            msg: 'Unlock account succeed'
        }))

        yield put(reloadAccountRequest(true))
    } catch (e){
        yield put(unlockAccountFail({
            error: 'Unlock account failed'
        }))
    }
}

export const mapStudentIdRequest = (accountId: string, studentInfo: StudentInfo): MapStudentIdRequest => ({
    type: adminAction.MAP_STUDENT_ID_REQUEST,
    payload: {
        accountId,
        studentInfo
    }
});

export const mapStudentIdSuccess = (payload: EditAccountSuccessPayload):MapStudentIdSuccess =>({
    type: adminAction.MAP_STUDENT_ID_SUCCESS,
    payload: payload
});

export const mapStudentIdFail = (payload: AdminFailPayload):UnlockAccountFail =>({
    type: adminAction.MAP_STUDENT_ID_FAIL,
    payload: payload
});
 
function* mapStudentIdSaga(action: MapStudentIdRequest) {
    try {
        yield call(adminService.mapStudentId, action.payload.accountId, action.payload.studentInfo);
        let accounts: Account[] = yield select((state: AppState)=>state.admin.accounts.data)
        let index = accounts.findIndex(account=>account.id===action.payload.accountId)
        var update = {
            ...accounts[index],
            studentId: action.payload.studentInfo.studentId
        }

        yield put(mapStudentIdSuccess({
            accounts: [
                ...accounts.slice(0, index),
                update,
                ...accounts.slice(index+1)
            ],
            msg: 'Map student ID succeed'
        }))
    } catch (e){
        yield put(mapStudentIdFail({
            error: 'Map student ID failed'
        }))
    }
}

export const removeStudentIdRequest = (accountId: string): RemoveStudentIdRequest => ({
    type: adminAction.REMOVE_STUDENT_ID_REQUEST,
    payload: accountId
});

export const removeStudentIdSuccess = (payload: EditAccountSuccessPayload):RemoveStudentIdSuccess =>({
    type: adminAction.REMOVE_STUDENT_ID_SUCCESS,
    payload: payload
});

export const removeStudentIdFail = (payload: AdminFailPayload):RemoveStudentIdFail =>({
    type: adminAction.REMOVE_STUDENT_ID_FAIL,
    payload: payload
});
 
function* removeStudentIdSaga(action: RemoveStudentIdRequest) {
    try {
        yield call(adminService.removeStudentId, action.payload);
        let accounts: Account[] = yield select((state: AppState)=>state.admin.accounts.data)
        let index = accounts.findIndex(account=>account.id===action.payload)
        var update = {
            ...accounts[index],
            studentId: undefined
        }

        yield put(removeStudentIdSuccess({
            accounts: [
                ...accounts.slice(0, index),
                update,
                ...accounts.slice(index+1)
            ],
            msg: 'Remove student ID succeed'
        }))
    } catch (e){
        yield put(removeStudentIdFail({
            error: 'Remove student ID failed'
        }))
    }
}

export function* adminSaga() {
    yield all([
        takeLatest(adminAction.CREATE_ADMIN_REQUEST, createAdminSaga),
        takeLatest(adminAction.GET_CLASSROOM_REQUEST, getClassroomSaga),
        takeLatest(adminAction.GET_ACCOUNT_REQUEST, getAccountSaga),
        takeLatest(adminAction.GET_ADMIN_REQUEST, getAdminSaga),
        takeLatest(adminAction.GET_LOCK_REQUEST, getLockSaga),
        takeEvery(adminAction.ACTIVATE_ADMIN_REQUEST, activateAdminSaga),
        takeEvery(adminAction.LOCK_ACCOUNT_REQUEST, lockAccountSaga),
        takeEvery(adminAction.UNLOCK_ACCOUNT_REQUEST, unlockAccountSaga),
        takeEvery(adminAction.MAP_STUDENT_ID_REQUEST, mapStudentIdSaga),
        takeEvery(adminAction.REMOVE_STUDENT_ID_REQUEST, removeStudentIdSaga),
    ]);
}


export default adminSaga;