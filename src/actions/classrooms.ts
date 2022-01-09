import { AddClassroomFailPayload, AddClassroomRequest, AddClassroomsFail, AddClassroomSuccess, 
    AddClassroomSuccessPayload, GetClassroomsFail, GetClassroomsFailPayload, 
    GetClassroomsRequest, GetClassroomsSuccess, GetClassroomsSuccessPayload, JoinClassroomRequest, 
    JoinClassroomSuccessPayload, JoinClassroomSuccess, JoinClassroomFailPayload, JoinClassroomsFail, ReloadClassroomsRequest } from "@/@types/classroom.action";
import { Classroom, GetDataCriteria, JoinRequestInfo } from "@/@types/model";
import { classroomService } from "@/services";
import { all, call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { classroomActions } from "../constants/actions";
import { redirectRequest } from "./common";
import { getDetailRequest } from "./detail";

export const getClassroomsRequest = (criteria: GetDataCriteria): GetClassroomsRequest => ({
    type: classroomActions.GETALL_REQUEST,
    payload: criteria
});

export const getClassroomsSuccess = (payload: GetClassroomsSuccessPayload):GetClassroomsSuccess =>({
    type: classroomActions.GETALL_SUCCESS,
    payload: payload
});

export const getClassroomsFail = (payload: GetClassroomsFailPayload):GetClassroomsFail =>({
    type: classroomActions.GETALL_FAILURE,
    payload: payload
});
 
function* getClassroomsSaga(action: GetClassroomsRequest) {
    const classes = yield call(classroomService.getClassrooms, action.payload);
    if(classes) {
        yield put(getClassroomsSuccess({
            classes: classes
        }))
    } else {
        yield put(getClassroomsFail({
            error: 'Get classroom failed'
        }))
    }
}

export const addClassroomRequest = (classroom: Classroom): AddClassroomRequest => ({
    type: classroomActions.ADD_REQUEST,
    payload: classroom
});

export const addClassroomSuccess = (payload: AddClassroomSuccessPayload):AddClassroomSuccess =>({
    type: classroomActions.ADD_SUCCESS,
    payload: payload
});

export const addClassroomFail = (payload: AddClassroomFailPayload):AddClassroomsFail =>({
    type: classroomActions.ADD_FAILURE,
    payload: payload
});
 
function* addClassroomsSaga(action: AddClassroomRequest) {
    try{
        const classroom = yield call(classroomService.addClassroom, action.payload);
        classroomService.addClassroomLocal(classroom.data)
        yield put(addClassroomSuccess({
            classroom: classroom.data
        }))
        yield put(getDetailRequest(classroom.data))
        yield put(redirectRequest(classroom.data))
        yield put(getClassroomsRequest({
            reload: false
        }))
    } catch (e){
        yield put(addClassroomFail({
            error: 'Add classroom failed'
        }))
    }
}

export const joinClassroomRequest = (request: JoinRequestInfo): JoinClassroomRequest => ({
    type: classroomActions.JOIN_REQUEST,
    payload: request
});

export const joinClassroomSuccess = (payload: JoinClassroomSuccessPayload):JoinClassroomSuccess =>({
    type: classroomActions.JOIN_SUCCESS,
    payload: payload
});

export const joinClassroomFail = (payload: JoinClassroomFailPayload):JoinClassroomsFail =>({
    type: classroomActions.JOIN_FAILURE,
    payload: payload
});
 
function* joinClassroomsSaga(action: JoinClassroomRequest) {
    try{
        const classroom = yield call(classroomService.joinClassroom, action.payload);
        classroomService.addClassroomLocal(classroom.data)
        yield put(joinClassroomSuccess({
            classroom: classroom.data
        }))
        yield put(redirectRequest(classroom.data))
        yield put(getClassroomsRequest({
            reload: false
        }))
    } catch (e){
        yield put(joinClassroomFail({
            error: 'Join classroom failed'
        }))
    }
}

export const reloadClassroomRequest = (fetch: boolean): ReloadClassroomsRequest => ({
    type: classroomActions.RELOAD_REQUEST,
    payload: {
        fetch
    }
});


export function* classroomsSaga() {
    yield all([
        takeLatest(classroomActions.GETALL_REQUEST, getClassroomsSaga),
        takeEvery(classroomActions.ADD_REQUEST, addClassroomsSaga),
        takeEvery(classroomActions.JOIN_REQUEST, joinClassroomsSaga)
    ]);
}

export default classroomsSaga;