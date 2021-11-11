import { ClassroomAction, AddClassroomFailPayload, AddClassroomRequest, AddClassroomsFail, AddClassroomSuccess, 
    AddClassroomSuccessPayload, GetClassroomsFail, GetClassroomsFailPayload, 
    GetClassroomsRequest, GetClassroomsSuccess, GetClassroomsSuccessPayload } from "@/@types/classroom.action";
import { AssignedClassroom, Classroom, GetClassroomsCriteria } from "@/@types/model";
import { classroomService } from "@/services";
import { all, call, put, takeEvery, takeLatest } from "@redux-saga/core/effects";
import { classroomActions } from "../constants/actions";

export const getClassroomsRequest = (criteria: GetClassroomsCriteria): GetClassroomsRequest => ({
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
 
function* getClassroomsSaga(action: ClassroomAction) {
    const classes = yield call(classroomService.getClassrooms, (action as GetClassroomsRequest).payload);
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
 
function* addClassroomsSaga(action: ClassroomAction) {
    try{
        const classroom = yield call(classroomService.addClassroom, (action as AddClassroomRequest).payload);
        classroomService.addClassroomLocal(classroom.data)
        yield put(addClassroomSuccess({
            classroom: classroom.data
        }))
        yield put(getClassroomsRequest({
            reload: false
        }))
    } catch (e){
        yield put(addClassroomFail({
            error: 'Add classroom failed'
        }))
    }
}

export function* classroomsSaga() {
    yield all([
        takeLatest(classroomActions.GETALL_REQUEST, getClassroomsSaga),
        takeEvery(classroomActions.ADD_REQUEST, addClassroomsSaga)
    ]);
}

export default classroomsSaga;