import { GetAssignmentsRequest, GetAssignmentsSuccessPayload, GetAssignmentsSuccess, GetAssignmentsFailPayload, GetAssignmentsFail, 
    ReloadAssignmentsRequest, AddAssignmentRequest, AddAssignmentSuccessPayload, AddAssignmentSuccess, AddAssignmentFailPayload, 
    AddAssignmentFail, UpdatePositionRequest, UpdatePositionSuccessPayload, UpdatePositionSuccess, UpdatePositionFailPayload, 
    UpdatePositionFail, RemoveAssignmentRequest, RemoveAssignmentSuccessPayload, RemoveAssignmentSuccess, RemoveAssignmentFailPayload, 
    RemoveAssignmentFail, UpdateAssignmentRequest, UpdateAssignmentSuccessPayload, UpdateAssignmentSuccess,
    UpdateAssignmentFailPayload, UpdateAssignmentFail, GetStudentInfosRequest, GetStudentInfosSuccessPayload, GetStudentInfosSuccess, GetStudentInfosFailPayload, GetStudentInfosFail, ImportStudentInfosRequest, ImportStudentInfosSuccess, ImportStudentInfosFailPayload, ImportStudentInfosFail, ExportTemplateRequest } from "@/@types/assignment.action";
import { Assignment } from "@/@types/model";
import { assignmentAction, detailAction } from "@/constants/actions";
import { AppState } from "@/reducers";
import { assignmentService, classroomService } from "@/services";
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
        const assignments = yield call(assignmentService.getAssignments, action.payload);
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
        const assignment = yield call(assignmentService.addAssignment, action.payload.id, action.payload.assignment);
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
        yield call(assignmentService.updateAssignmentPosition, action.payload.classId, result)
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
        yield call(assignmentService.removeAssignment, action.payload.classId, action.payload.id);
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
        var assignment = yield call(assignmentService.updateAssignment, action.payload.classId, action.payload.id, action.payload.assignment);
        yield put(updateAssignmentSuccess({
            assignment: assignment.data
        }))

    } catch (e) {
        yield put(updateAssignmentFail({
            error: 'Update assignment failed'
        }))
    }
}

export const getStudentInfosRequest = (classId: number): GetStudentInfosRequest => ({
    type: assignmentAction.GET_STUDENT_INFO_REQUEST,
    payload: classId
});

export const getStudentInfosSuccess = (payload: GetStudentInfosSuccessPayload):GetStudentInfosSuccess =>({
    type: assignmentAction.GET_STUDENT_INFO_SUCCESS,
    payload: payload
});

export const getStudentInfosFail = (payload: GetStudentInfosFailPayload):GetStudentInfosFail =>({
    type: assignmentAction.GET_STUDENT_INFO_FAIL,
    payload: payload
});
 
function* getStudentInfosSaga(action: GetStudentInfosRequest) {
    try {
        const studentInfos = yield call(assignmentService.getStudentInfos, action.payload);
        yield put(getStudentInfosSuccess({
            studentInfos: studentInfos.data
        }))
    } catch (e) {
        yield put(getStudentInfosFail({
            error: 'Get student infos failed'
        }))
    }
}

export const importStudentInfosRequest = (classId: number, file: File): ImportStudentInfosRequest => ({
    type: assignmentAction.IMPORT_STUDENT_INFO_REQUEST,
    payload: {
        classId,
        file
    }
});

export const importStudentInfosSuccess = ():ImportStudentInfosSuccess =>({
    type: assignmentAction.IMPORT_STUDENT_INFO_SUCCESS
});

export const importStudentInfosFail = (payload: ImportStudentInfosFailPayload):ImportStudentInfosFail =>({
    type: assignmentAction.IMPORT_STUDENT_INFO_FAIL,
    payload: payload
});
 
function* importStudentInfosSaga(action: ImportStudentInfosRequest) {
    try {
        yield call(assignmentService.importStudentInfos, action.payload.classId, action.payload.file);
        yield put(importStudentInfosSuccess())
    } catch (e) {
        yield put(importStudentInfosFail({
            error: 'Import student infos failed'
        }))
    }
}

export const exportTemplateRequest = (classId: number): ExportTemplateRequest => ({
    type: assignmentAction.EXPORT_TEMPLATE_REQUEST,
    payload: classId
});

function* exportTemplateSaga(action: ExportTemplateRequest) {
    try {
        yield call(assignmentService.exportTemplate, action.payload);
    } catch (e) {
        // just do nothing
    }
}

export function* assignmentSaga() {
    yield all([
        takeLatest(assignmentAction.GET_ASSIGNMENTS_REQUEST, getAssignmentsSaga),
        takeEvery(assignmentAction.ADD_ASSIGNMENT_REQUEST, addAssignmentSaga),
        takeLatest(assignmentAction.UPDATE_POSITION_REQUEST, updatePositionSaga),
        takeEvery(assignmentAction.REMOVE_ASSIGNMENT_REQUEST, removeAssignmentSaga),
        takeEvery(assignmentAction.UPDATE_ASSIGNMENT_REQUEST, updateAssignmentSaga),
        takeLatest(assignmentAction.GET_STUDENT_INFO_REQUEST, getStudentInfosSaga),
        takeLatest(assignmentAction.IMPORT_STUDENT_INFO_REQUEST, importStudentInfosSaga),
        takeEvery(assignmentAction.EXPORT_TEMPLATE_REQUEST, exportTemplateSaga)
    ]);
}

export default assignmentSaga;