import { assignmentAction } from "@/constants/actions";
import { Assignment, StudentInfo, Submission } from "./model";

export interface FinalizeWarning {
    assignmentId: number,
    msg: string
}

export interface AssignmentState {
    loading: boolean,
    assignments: {
        data: Assignment[],
        reload: boolean,
        warning?: FinalizeWarning
    },
    studentInfos: {
        data: StudentInfo[],
        reload: boolean
    }
    error: string|null,
    msg: string|null
}

export interface AssignmentFailPayload{
    error: string
}

export interface MsgPayload{
    msg: string
}

export interface GetAssignmentsSuccessPayload {
    assignments: Assignment[];
}

export interface GetAssignmentsRequest{
    type: typeof assignmentAction.GET_ASSIGNMENTS_REQUEST,
    payload: number //class ID
}

export interface GetAssignmentsSuccess {
    type: typeof assignmentAction.GET_ASSIGNMENTS_SUCCESS
    payload: GetAssignmentsSuccessPayload
}

export interface GetAssignmentsFail {
    type: typeof assignmentAction.GET_ASSIGNMENTS_FAIL
    payload: AssignmentFailPayload
}

export interface ReloadAssignmentsRequest{
    type: typeof assignmentAction.RELOAD_ASSIGNMENTS_REQUEST
}

export interface UpdatePositionSuccessPayload {
    assignments: Assignment[]
}

export interface UpdatePositionRequest{
    type: typeof assignmentAction.UPDATE_POSITION_REQUEST
    payload: {
        classId: number,
        start?: number,
        end?: number
    }
}

export interface UpdatePositionSuccess {
    type: typeof assignmentAction.UPDATE_POSITION_SUCCESS
    payload: UpdatePositionSuccessPayload
}

export interface UpdatePositionFail{
    type: typeof assignmentAction.UPDATE_POSITION_FAIL
    payload: AssignmentFailPayload
}

export interface AddAssignmentSuccessPayload extends MsgPayload{
    assignment: Assignment;
    index: number;
}

export interface AddAssignmentRequest{
    type: typeof assignmentAction.ADD_ASSIGNMENT_REQUEST,
    payload: {
        id: number,
        assignment: Assignment
    }
}

export interface AddAssignmentSuccess {
    type: typeof assignmentAction.ADD_ASSIGNMENT_SUCCESS
    payload: AddAssignmentSuccessPayload
}

export interface AddAssignmentFail {
    type: typeof assignmentAction.ADD_ASSIGNMENT_FAIL
    payload: AssignmentFailPayload
}

export interface RemoveAssignmentSuccessPayload extends MsgPayload{
    id: number
}

export interface RemoveAssignmentRequest{
    type: typeof assignmentAction.REMOVE_ASSIGNMENT_REQUEST,
    payload: {
        classId: number,
        id: number
    }
}

export interface RemoveAssignmentSuccess {
    type: typeof assignmentAction.REMOVE_ASSIGNMENT_SUCCESS,
    payload: RemoveAssignmentSuccessPayload
}

export interface RemoveAssignmentFail {
    type: typeof assignmentAction.REMOVE_ASSIGNMENT_FAIL
    payload: AssignmentFailPayload
}

export interface UpdateAssignmentSuccessPayload extends MsgPayload {
    assignment: Assignment;
}

export interface UpdateAssignmentRequest{
    type: typeof assignmentAction.UPDATE_ASSIGNMENT_REQUEST,
    payload: {
        classId: number,
        id: number,
        assignment: Assignment
    }
}

export interface UpdateAssignmentSuccess {
    type: typeof assignmentAction.UPDATE_ASSIGNMENT_SUCCESS
    payload: UpdateAssignmentSuccessPayload
}

export interface UpdateAssignmentFail {
    type: typeof assignmentAction.UPDATE_ASSIGNMENT_FAIL
    payload: AssignmentFailPayload
}

export interface GetStudentInfosSuccessPayload {
    studentInfos: StudentInfo[];
}

export interface GetStudentInfosRequest{
    type: typeof assignmentAction.GET_STUDENT_INFO_REQUEST,
    payload: number //class ID
}

export interface GetStudentInfosSuccess {
    type: typeof assignmentAction.GET_STUDENT_INFO_SUCCESS
    payload: GetStudentInfosSuccessPayload
}

export interface GetStudentInfosFail {
    type: typeof assignmentAction.GET_STUDENT_INFO_FAIL
    payload: AssignmentFailPayload
}

export interface ImportStudentInfosRequest{
    type: typeof assignmentAction.IMPORT_STUDENT_INFO_REQUEST,
    payload: {
        classId: number,
        file: File
    }
}

export interface ImportStudentInfosSuccess {
    type: typeof assignmentAction.IMPORT_STUDENT_INFO_SUCCESS,
    payload: MsgPayload
}

export interface ImportStudentInfosFail {
    type: typeof assignmentAction.IMPORT_STUDENT_INFO_FAIL
    payload: AssignmentFailPayload
}

export interface ExportTemplateRequest{
    type: typeof assignmentAction.EXPORT_TEMPLATE_REQUEST,
    payload: number //class ID
}

export interface AddSubmissionSuccessPayload extends MsgPayload {
    studentInfo: StudentInfo;
    index: number;
}

export interface AddSubmissionRequest{
    type: typeof assignmentAction.ADD_SUBMISSION_REQUEST,
    payload: {
        classId: number,
        assignmentId: number,
        submission: Submission
    }
}

export interface AddSubmissionSuccess {
    type: typeof assignmentAction.ADD_SUBMISSION_SUCCESS
    payload: AddSubmissionSuccessPayload
}

export interface AddSubmissionFail {
    type: typeof assignmentAction.ADD_SUBMISSION_FAIL
    payload: AssignmentFailPayload
}

export interface ImportSubmissionRequest{
    type: typeof assignmentAction.IMPORT_SUBMISSION_REQUEST,
    payload: {
        classId: number,
        assignmentId: number,
        file: File
    }
}

export interface ImportSubmissionSuccess {
    type: typeof assignmentAction.IMPORT_SUBMISSION_SUCCESS,
    payload: MsgPayload
}

export interface ImportSubmissionFail {
    type: typeof assignmentAction.IMPORT_SUBMISSION_FAIL
    payload: AssignmentFailPayload
}

export interface ReloadStudentInfoRequest{
    type: typeof assignmentAction.RELOAD_STUDENT_INFO_REQUEST
}
 
export interface UpdateSubmissionSuccessPayload extends MsgPayload {
    studentInfo: StudentInfo;
    index: number;
}

export interface UpdateSubmissionRequest{
    type: typeof assignmentAction.UPDATE_SUBMISSION_REQUEST,
    payload: {
        classId: number,
        assignmentId: number,
        submissionId: number,
        grade: number
    }
}

export interface UpdateSubmissionSuccess {
    type: typeof assignmentAction.UPDATE_SUBMISSION_SUCCESS
    payload: UpdateSubmissionSuccessPayload
}

export interface UpdateSubmissionFail {
    type: typeof assignmentAction.UPDATE_SUBMISSION_FAIL
    payload: AssignmentFailPayload
}

export interface FinalizeAssignmentSuccessPayload extends MsgPayload {
    assignments: Assignment[];
}

export interface FinalizeAssignmentRequest{
    type: typeof assignmentAction.FINALIZE_ASSIGNMENT_REQUEST,
    payload: {
        classId:number,
        assignmentId: number,
        check: boolean
    }
}

export interface FinalizeAssignmentSuccess {
    type: typeof assignmentAction.FINALIZE_ASSIGNMENT_SUCCESS
    payload: FinalizeAssignmentSuccessPayload
}

export interface FinalizeAssignmentFail {
    type: typeof assignmentAction.FINALIZE_ASSIGNMENT_FAIL
    payload: AssignmentFailPayload
}

export interface FinalizeAssignmentConfirm {
    type: typeof assignmentAction.FINALIZE_ASSIGNMENT_CONFIRM
    payload: FinalizeWarning
}

export type StudentInfoAction = 
    | GetStudentInfosRequest
    | GetStudentInfosSuccess
    | GetStudentInfosFail
    | ImportStudentInfosRequest
    | ImportStudentInfosSuccess
    | ImportStudentInfosFail

export type SubmissionAction = 
    | AddSubmissionRequest
    | AddSubmissionSuccess
    | AddSubmissionFail
    | ImportSubmissionRequest
    | ImportSubmissionSuccess
    | ImportSubmissionFail
    | UpdateSubmissionRequest
    | UpdateSubmissionSuccess
    | UpdateSubmissionFail

export type AssignmentAction = 
    | GetAssignmentsRequest
    | GetAssignmentsSuccess
    | GetAssignmentsFail
    | ReloadAssignmentsRequest
    | AddAssignmentRequest
    | AddAssignmentSuccess
    | AddAssignmentFail
    | UpdatePositionRequest
    | UpdatePositionSuccess
    | UpdatePositionFail
    | RemoveAssignmentRequest
    | RemoveAssignmentSuccess
    | RemoveAssignmentFail
    | UpdateAssignmentRequest
    | UpdateAssignmentSuccess
    | UpdateAssignmentFail
    | StudentInfoAction
    | ExportTemplateRequest
    | SubmissionAction
    | ReloadStudentInfoRequest
    | FinalizeAssignmentRequest
    | FinalizeAssignmentSuccess
    | FinalizeAssignmentFail
    | FinalizeAssignmentConfirm