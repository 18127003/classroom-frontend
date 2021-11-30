import { assignmentAction } from "@/constants/actions";
import { Assignment, StudentInfo } from "./model";

export interface AssignmentState {
    loading: boolean,
    assignments: {
        data: Assignment[],
        reload: boolean
    },
    studentInfos: {
        data: StudentInfo[],
        reload: boolean
    }
    error: string|null,
}

export interface GetAssignmentsSuccessPayload {
    assignments: Assignment[];
}

export interface GetAssignmentsFailPayload{
    error: string
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
    payload: GetAssignmentsFailPayload
}

export interface ReloadAssignmentsRequest{
    type: typeof assignmentAction.RELOAD_ASSIGNMENTS_REQUEST
}

export interface UpdatePositionFailPayload{
    error: string
}

export interface UpdatePositionSuccessPayload{
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
    payload: UpdatePositionFailPayload
}

export interface AddAssignmentSuccessPayload {
    assignment: Assignment;
    index: number;
}

export interface AddAssignmentFailPayload{
    error: string
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
    payload: AddAssignmentFailPayload
}

export interface RemoveAssignmentSuccessPayload{
    id: number
}

export interface RemoveAssignmentFailPayload{
    error: string
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
    payload: RemoveAssignmentFailPayload
}

export interface UpdateAssignmentSuccessPayload {
    assignment: Assignment;
}

export interface UpdateAssignmentFailPayload{
    error: string
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
    payload: UpdateAssignmentFailPayload
}

export interface GetStudentInfosSuccessPayload {
    studentInfos: StudentInfo[];
}

export interface GetStudentInfosFailPayload{
    error: string
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
    payload: GetStudentInfosFailPayload
}

export interface ImportStudentInfosFailPayload{
    error: string
}

export interface ImportStudentInfosRequest{
    type: typeof assignmentAction.IMPORT_STUDENT_INFO_REQUEST,
    payload: {
        classId: number,
        file: File
    }
}

export interface ImportStudentInfosSuccess {
    type: typeof assignmentAction.IMPORT_STUDENT_INFO_SUCCESS
}

export interface ImportStudentInfosFail {
    type: typeof assignmentAction.IMPORT_STUDENT_INFO_FAIL
    payload: ImportStudentInfosFailPayload
}

export type StudentInfoAction = 
    | GetStudentInfosRequest
    | GetStudentInfosSuccess
    | GetStudentInfosFail
    | ImportStudentInfosRequest
    | ImportStudentInfosSuccess
    | ImportStudentInfosFail

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