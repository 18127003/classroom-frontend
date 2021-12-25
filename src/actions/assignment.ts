import { GetAssignmentsRequest, GetAssignmentsSuccessPayload, GetAssignmentsSuccess, GetAssignmentsFailPayload, GetAssignmentsFail, 
    ReloadAssignmentsRequest, AddAssignmentRequest, AddAssignmentSuccessPayload, AddAssignmentSuccess, AddAssignmentFailPayload, 
    AddAssignmentFail, UpdatePositionRequest, UpdatePositionSuccessPayload, UpdatePositionSuccess, UpdatePositionFailPayload, 
    UpdatePositionFail, RemoveAssignmentRequest, RemoveAssignmentSuccessPayload, RemoveAssignmentSuccess, RemoveAssignmentFailPayload, 
    RemoveAssignmentFail, UpdateAssignmentRequest, UpdateAssignmentSuccessPayload, UpdateAssignmentSuccess,
    UpdateAssignmentFailPayload, UpdateAssignmentFail, GetStudentInfosRequest, GetStudentInfosSuccessPayload, GetStudentInfosSuccess, 
    GetStudentInfosFailPayload, GetStudentInfosFail, ImportStudentInfosRequest, ImportStudentInfosSuccess, 
    ImportStudentInfosFailPayload, ImportStudentInfosFail, ExportTemplateRequest, AddSubmissionRequest, AddSubmissionSuccess, 
    AddSubmissionSuccessPayload, AddSubmissionFail, AddSubmissionFailPayload, ImportSubmissionRequest, ImportSubmissionSuccess, 
    ImportSubmissionFailPayload, ImportSubmissionFail, ReloadStudentInfoRequest, UpdateSubmissionRequest, UpdateSubmissionSuccess, 
    UpdateSubmissionSuccessPayload, UpdateSubmissionFail, UpdateSubmissionFailPayload, FinalizeAssignmentRequest, FinalizeAssignmentSuccessPayload, 
    FinalizeAssignmentSuccess, FinalizeAssignmentFailPayload, FinalizeAssignmentFail, FinalizeAssignmentConfirm, FinalizeWarning } from "@/@types/assignment.action";
import { Assignment, StudentInfo, Submission } from "@/@types/model";
import { assignmentAction } from "@/constants/actions";
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
        yield put(reloadStudentInfoRequest())
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
        const studentInfos = yield call(classroomService.getStudentInfos, action.payload);
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
        yield call(classroomService.importStudentInfos, action.payload.classId, action.payload.file);
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

export const addSubmissionRequest = (classId: number, assignmentId: number, submission: Submission): AddSubmissionRequest => ({
    type: assignmentAction.ADD_SUBMISSION_REQUEST,
    payload: {
        classId,
        assignmentId,
        submission
    }
});

export const addSubmissionSuccess = (payload: AddSubmissionSuccessPayload):AddSubmissionSuccess =>({
    type: assignmentAction.ADD_SUBMISSION_SUCCESS,
    payload: payload
});

export const addSubmissionFail = (payload: AddSubmissionFailPayload):AddSubmissionFail =>({
    type: assignmentAction.ADD_SUBMISSION_FAIL,
    payload: payload
});
 
function* addSubmissionSaga(action: AddSubmissionRequest) {
    try {
        const payload = action.payload
        const res = yield call(assignmentService.addSubmission, payload.classId, payload.assignmentId, payload.submission);
        const studentInfos: StudentInfo[] = yield select((state:AppState)=>state.assignment.studentInfos.data)
        const index = studentInfos.findIndex(s=>s.studentId===res.data.studentId)
        const studentInfo = studentInfos[index]
        studentInfo.submissions = [
            ...studentInfo.submissions,
            res.data
        ]
        yield put(addSubmissionSuccess({
            studentInfo: studentInfo,
            index: index
        }))
    } catch (e) {
        yield put(addSubmissionFail({
            error: 'Grade failed'
        }))
    }
}

export const importSubmissionRequest = (classId: number, assignmentId: number, file: File): ImportSubmissionRequest => ({
    type: assignmentAction.IMPORT_SUBMISSION_REQUEST,
    payload: {
        classId,
        assignmentId,
        file
    }
});

export const importSubmissionSuccess = ():ImportSubmissionSuccess =>({
    type: assignmentAction.IMPORT_SUBMISSION_SUCCESS
});

export const importSubmissionFail = (payload: ImportSubmissionFailPayload):ImportSubmissionFail =>({
    type: assignmentAction.IMPORT_SUBMISSION_FAIL,
    payload: payload
});

export const reloadStudentInfoRequest = (): ReloadStudentInfoRequest => ({
    type: assignmentAction.RELOAD_STUDENT_INFO_REQUEST
});
 
function* importSubmissionSaga(action: ImportSubmissionRequest) {
    try {
        const payload = action.payload
        yield call(assignmentService.importSubmission, payload.classId, payload.assignmentId, payload.file);
        yield put(importSubmissionSuccess())
        yield put(reloadStudentInfoRequest())
    } catch (e) {
        console.log(e)
        yield put(importSubmissionFail({
            error: 'Import grade failed'
        }))
    }
}

export const updateSubmissionRequest = (classId: number, assignmentId: number, submissionId: number, grade:number): UpdateSubmissionRequest => ({
    type: assignmentAction.UPDATE_SUBMISSION_REQUEST,
    payload: {
        classId,
        assignmentId,
        submissionId,
        grade
    }
});

export const updateSubmissionSuccess = (payload: UpdateSubmissionSuccessPayload):UpdateSubmissionSuccess =>({
    type: assignmentAction.UPDATE_SUBMISSION_SUCCESS,
    payload: payload
});

export const updateSubmissionFail = (payload: UpdateSubmissionFailPayload):UpdateSubmissionFail =>({
    type: assignmentAction.UPDATE_SUBMISSION_FAIL,
    payload: payload
});
 
function* updateSubmissionSaga(action: UpdateSubmissionRequest) {
    try {
        const payload = action.payload
        const res = yield call(assignmentService.updateSubmission, payload.classId, payload.assignmentId, 
            payload.submissionId, payload.grade);
        const studentInfos: StudentInfo[] = yield select((state:AppState)=>state.assignment.studentInfos.data)
        const index = studentInfos.findIndex(s=>s.studentId===res.data.studentId)
        const studentInfo = studentInfos[index]
        const submissionIndex = studentInfo.submissions.findIndex(s=>s.id===res.data.id)

        studentInfo.submissions = [
            ...studentInfo.submissions.slice(0, submissionIndex),
            res.data,
            ...studentInfo.submissions.slice(submissionIndex+1)
        ]
        yield put(updateSubmissionSuccess({
            studentInfo: studentInfo,
            index: index
        }))
    } catch (e) {
        yield put(updateSubmissionFail({
            error: 'Grade failed'
        }))
    }
}

export const finalizeAssignmentRequest = (classId: number, assignmentId: number, check: boolean): FinalizeAssignmentRequest => ({
    type: assignmentAction.FINALIZE_ASSIGNMENT_REQUEST,
    payload: {
        classId: classId,
        assignmentId: assignmentId,
        check: check
    }
});

export const finalizeAssignmentSuccess = (payload: FinalizeAssignmentSuccessPayload):FinalizeAssignmentSuccess =>({
    type: assignmentAction.FINALIZE_ASSIGNMENT_SUCCESS,
    payload: payload
});

export const finalizeAssignmentFail = (payload: FinalizeAssignmentFailPayload):FinalizeAssignmentFail =>({
    type: assignmentAction.FINALIZE_ASSIGNMENT_FAIL,
    payload: payload
});

export const finalizeAssignmentConfirm = (warning: FinalizeWarning):FinalizeAssignmentConfirm =>({
    type: assignmentAction.FINALIZE_ASSIGNMENT_CONFIRM,
    payload: warning
});

function* finalizeAssignmentSaga(action: FinalizeAssignmentRequest) {
    try {
        let finalize = true
        let assignmentId = action.payload.assignmentId
        if (action.payload.check){
            var checkFill = yield call(assignmentService.checkFillSubmission, action.payload.classId, assignmentId)
            if (!checkFill.data.filled){
                finalize = false
                yield put(finalizeAssignmentConfirm({
                    assignmentId: action.payload.assignmentId,
                    msg: `${checkFill.data.studentIds.join()} has not graded. Do you want to finalize?`
                }))
            }
        }
        if (finalize) {
            yield call(assignmentService.finalizeAssignment, action.payload.classId, assignmentId);
            let assignments: Assignment[] = yield select((state: AppState)=>state.assignment.assignments.data)
            let index = assignments.findIndex((assignment)=>assignment.id===assignmentId)
            let updated = {
                ...assignments[index],
                status: 'FINAL'
            }
            yield put(finalizeAssignmentSuccess({
                assignments: [
                    ...assignments.slice(0, index),
                    updated,
                    ...assignments.slice(index+1)
                ]
            }))
        }

    } catch (e) {
        console.log(e)
        yield put(finalizeAssignmentFail({
            error: 'Finalize assignment grades failed'
        }))
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
        takeEvery(assignmentAction.EXPORT_TEMPLATE_REQUEST, exportTemplateSaga),
        takeEvery(assignmentAction.ADD_SUBMISSION_REQUEST, addSubmissionSaga),
        takeEvery(assignmentAction.IMPORT_SUBMISSION_REQUEST, importSubmissionSaga),
        takeEvery(assignmentAction.UPDATE_SUBMISSION_REQUEST, updateSubmissionSaga),
        takeEvery(assignmentAction.FINALIZE_ASSIGNMENT_REQUEST, finalizeAssignmentSaga)
    ]);
}

export default assignmentSaga;