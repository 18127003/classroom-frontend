import { GetAssignmentsRequest, GetAssignmentsSuccessPayload, GetAssignmentsSuccess, GetAssignmentsFailPayload, GetAssignmentsFail, 
    ReloadAssignmentsRequest, AddAssignmentRequest, AddAssignmentSuccessPayload, AddAssignmentSuccess, AddAssignmentFailPayload, 
    AddAssignmentFail, UpdatePositionRequest, UpdatePositionSuccessPayload, UpdatePositionSuccess, UpdatePositionFailPayload, 
    UpdatePositionFail, RemoveAssignmentRequest, RemoveAssignmentSuccessPayload, RemoveAssignmentSuccess, RemoveAssignmentFailPayload, 
    RemoveAssignmentFail, UpdateAssignmentRequest, UpdateAssignmentSuccessPayload, UpdateAssignmentSuccess,
    UpdateAssignmentFailPayload, UpdateAssignmentFail } from "@/@types/assignment.action";
import { Assignment } from "@/@types/model";
import { assignmentAction, detailAction } from "@/constants/actions";
import { AppState } from "@/reducers";
import { classroomService } from "@/services";
import { put, select, all, takeLatest, takeEvery, call } from "redux-saga/effects";

export const getAssignmentsRequest = (classId: number): GetAssignmentsRequest => ({
    type: assignmentAction.GET_ASSIGNMENTS_REQUEST,
    payload: classId
});

export const getAssignmentsSuccess = (payload: GetAssignmentsSuccessPayload):GetAssignmentsSuccess =>({
    type: assignmentAction.GET_ASSIGNMENTS_SUCCESS,
    payload: payload
});

export const getAssignmentsFail = (payload: GetAssignmentsFailPayload):GetAssignmentsFail =>({
    type: assignmentAction.GET_ASSIGNMENTS_FAIL,
    payload: payload
});

export const reloadAssignmentsRequest = (): ReloadAssignmentsRequest => ({
    type: assignmentAction.RELOAD_ASSIGNMENTS_REQUEST
});
 
function* getAssignmentsSaga(action: GetAssignmentsRequest) {
    try {
        const assignments = yield call(classroomService.getAssignments, action.payload);
        yield put(getAssignmentsSuccess({
            assignments: assignments.data
        }))
    } catch (e) {
        yield put(getAssignmentsFail({
            error: 'Get assignments failed'
        }))
    }
}

export const addAssignmentRequest = (classId: number, assignment: Assignment): AddAssignmentRequest => ({
    type: assignmentAction.ADD_ASSIGNMENT_REQUEST,
    payload: {
        id: classId,
        assignment: assignment
    }
});

export const addAssignmentSuccess = (payload: AddAssignmentSuccessPayload):AddAssignmentSuccess =>({
    type: assignmentAction.ADD_ASSIGNMENT_SUCCESS,
    payload: payload
});

export const addAssignmentFail = (payload: AddAssignmentFailPayload):AddAssignmentFail =>({
    type: assignmentAction.ADD_ASSIGNMENT_FAIL,
    payload: payload
});

function* addAssignmentSaga(action: AddAssignmentRequest) {
    try {
        const assignment = yield call(classroomService.addAssignment, action.payload.id, action.payload.assignment);
        yield put(addAssignmentSuccess({
            assignment: assignment.data,
            index: action.payload.assignment.position
        }))
        yield put(updatePositionRequest(action.payload.id))

    } catch (e) {
        yield put(addAssignmentFail({
            error: 'Add assignment failed'
        }))
    }
}

export const updatePositionRequest = (classId:number, start?:number, end?:number): UpdatePositionRequest => ({
    type: assignmentAction.UPDATE_POSITION_REQUEST,
    payload: {
        classId,
        start,
        end
    }
});

export const updatePositionSuccess = (payload: UpdatePositionSuccessPayload):UpdatePositionSuccess =>({
    type: assignmentAction.UPDATE_POSITION_SUCCESS,
    payload: payload
});

export const updatePositionFail = (payload: UpdatePositionFailPayload):UpdatePositionFail =>({
    type: assignmentAction.UPDATE_POSITION_FAIL,
    payload: payload
});

function* updatePositionSaga(action: UpdatePositionRequest) {
    
    const assignments: Assignment[] = yield select((state:AppState)=>state.assignment.assignments.data)
    const result = Array.from(assignments);
    if(action.payload.start!==undefined && action.payload.end!==undefined){
        const [removed] = result.splice(action.payload.start, 1);
        result.splice(action.payload.end, 0, removed);
        yield put(updatePositionSuccess({
            assignments: result
        }))
    }
    
    try {
        yield call(classroomService.updateAssignmentPosition, action.payload.classId, result)
    } catch (e){
        yield put (updatePositionFail({
            error: 'Update assignment position failed'
        }))
    }
}

export const removeAssignmentRequest = (classId: number, id: number): RemoveAssignmentRequest => ({
    type: assignmentAction.REMOVE_ASSIGNMENT_REQUEST,
    payload: {
        classId: classId,
        id: id
    }
});

export const removeAssignmentSuccess = (payload: RemoveAssignmentSuccessPayload):RemoveAssignmentSuccess =>({
    type: assignmentAction.REMOVE_ASSIGNMENT_SUCCESS,
    payload: payload
});

export const removeAssignmentFail = (payload: RemoveAssignmentFailPayload):RemoveAssignmentFail =>({
    type: assignmentAction.REMOVE_ASSIGNMENT_FAIL,
    payload: payload
});

function* removeAssignmentSaga(action: RemoveAssignmentRequest) {
    try {
        yield call(classroomService.removeAssignment, action.payload.classId, action.payload.id);
        yield put(removeAssignmentSuccess({
            id: action.payload.id
        }))
        yield put(updatePositionRequest(action.payload.classId))

    } catch (e) {
        yield put(removeAssignmentFail({
            error: 'Remove assignment failed'
        }))
    }
}

export const updateAssignmentRequest = (classId: number, id: number, assignment: Assignment): UpdateAssignmentRequest => ({
    type: assignmentAction.UPDATE_ASSIGNMENT_REQUEST,
    payload: {
        classId: classId,
        id: id,
        assignment: assignment
    }
});

export const updateAssignmentSuccess = (payload: UpdateAssignmentSuccessPayload):UpdateAssignmentSuccess =>({
    type: assignmentAction.UPDATE_ASSIGNMENT_SUCCESS,
    payload: payload
});

export const updateAssignmentFail = (payload: UpdateAssignmentFailPayload):UpdateAssignmentFail =>({
    type: assignmentAction.UPDATE_ASSIGNMENT_FAIL,
    payload: payload
});

function* updateAssignmentSaga(action: UpdateAssignmentRequest) {
    try {
        var assignment = yield call(classroomService.updateAssignment, action.payload.classId, action.payload.id, action.payload.assignment);
        yield put(updateAssignmentSuccess({
            assignment: assignment.data
        }))

    } catch (e) {
        yield put(updateAssignmentFail({
            error: 'Update assignment failed'
        }))
    }
}

export function* assignmentSaga() {
    yield all([
        takeLatest(assignmentAction.GET_ASSIGNMENTS_REQUEST, getAssignmentsSaga),
        takeEvery(assignmentAction.ADD_ASSIGNMENT_REQUEST, addAssignmentSaga),
        takeLatest(assignmentAction.UPDATE_POSITION_REQUEST, updatePositionSaga),
        takeEvery(assignmentAction.REMOVE_ASSIGNMENT_REQUEST, removeAssignmentSaga),
        takeEvery(assignmentAction.UPDATE_ASSIGNMENT_REQUEST, updateAssignmentSaga)
    ]);
}

export default assignmentSaga;