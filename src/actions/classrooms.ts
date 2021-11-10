import { GetClassroomsAction, GetClassroomsFail, GetClassroomsFailPayload, GetClassroomsRequest, GetClassroomsSuccess, GetClassroomsSuccessPayload } from "@/@types/classroom.action";
import { GetClassroomsCriteria } from "@/@types/model";
import { userService } from "@/services";
import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { actionConstants } from "./actions.constant";

export const getClassroomsRequest = (criteria: GetClassroomsCriteria): GetClassroomsRequest => ({
    type: actionConstants.GETALL_REQUEST,
    payload: criteria
});

export const getClassroomsSuccess = (payload: GetClassroomsSuccessPayload):GetClassroomsSuccess =>({
    type: actionConstants.GETALL_SUCCESS,
    payload: payload
});

export const getClassroomsFail = (payload: GetClassroomsFailPayload):GetClassroomsFail =>({
    type: actionConstants.GETALL_FAILURE,
    payload: payload
});
 
function* getClassroomsSaga(action: GetClassroomsAction) {
    const classes = yield call(userService.getClassrooms, (action as GetClassroomsRequest).payload);
    if(classes) {
        yield put(getClassroomsSuccess({
            classes: classes
        }))
    } else {
        yield put(getClassroomsFail({
            error: 'Login failed'
        }))
    }
}

export function* classroomsSaga() {
    yield all([takeLatest(actionConstants.GETALL_REQUEST, getClassroomsSaga)]);
}

export default classroomsSaga;