import { classroomActions } from "@/constants/actions";
import { AssignedClassroom, Classroom, GetClassroomsCriteria } from "./model";

export interface GetClassroomsSuccessPayload {
    classes: AssignedClassroom[];
}

export interface GetClassroomsFailPayload{
    error: string
}

export interface ClassroomsState {
    loading: boolean,
    classes: AssignedClassroom[],
    error: string|null
}

export interface GetClassroomsRequest{
    type: typeof classroomActions.GETALL_REQUEST,
    payload: GetClassroomsCriteria
}

export interface GetClassroomsSuccess {
    type: typeof classroomActions.GETALL_SUCCESS
    payload: GetClassroomsSuccessPayload
}

export interface GetClassroomsFail {
    type: typeof classroomActions.GETALL_FAILURE
    payload: GetClassroomsFailPayload
}
    

export interface AddClassroomSuccessPayload {
    classroom: AssignedClassroom;
}

export interface AddClassroomFailPayload{
    error: string
}

export interface AddClassroomRequest{
    type: typeof classroomActions.ADD_REQUEST,
    payload: Classroom
}

export interface AddClassroomSuccess {
    type: typeof classroomActions.ADD_SUCCESS
    payload: AddClassroomSuccessPayload
}

export interface AddClassroomsFail {
    type: typeof classroomActions.ADD_FAILURE
    payload: AddClassroomFailPayload
}

export type ClassroomAction = 
    | GetClassroomsRequest
    | GetClassroomsSuccess
    | GetClassroomsFail
    | AddClassroomRequest
    | AddClassroomSuccess
    | AddClassroomsFail