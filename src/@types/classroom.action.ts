import { classroomActions } from "@/constants/actions";
import { AssignedClassroom, Classroom, GetDataCriteria, JoinRequestInfo } from "./model";

export interface ClassroomsFailPayload{
    error: string
}

export interface ClassroomsState {
    loading: boolean,
    classes: AssignedClassroom[],
    error: string|null,
    reload: {
        reload: boolean,
        fetch: boolean
    }
}

export interface GetClassroomsSuccessPayload {
    classes: AssignedClassroom[];
}

export interface ReloadClassroomsRequest{
    type: typeof classroomActions.RELOAD_REQUEST,
    payload: {
        fetch: boolean
    }
}

export interface GetClassroomsRequest{
    type: typeof classroomActions.GETALL_REQUEST,
    payload: GetDataCriteria
}

export interface GetClassroomsSuccess {
    type: typeof classroomActions.GETALL_SUCCESS
    payload: GetClassroomsSuccessPayload
}

export interface GetClassroomsFail {
    type: typeof classroomActions.GETALL_FAILURE
    payload: ClassroomsFailPayload
}
    

export interface AddClassroomSuccessPayload {
    classroom: AssignedClassroom;
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
    payload: ClassroomsFailPayload
}

export interface JoinClassroomSuccessPayload {
    classroom: AssignedClassroom;
}

export interface JoinClassroomRequest{
    type: typeof classroomActions.JOIN_REQUEST,
    payload: JoinRequestInfo
}

export interface JoinClassroomSuccess {
    type: typeof classroomActions.JOIN_SUCCESS
    payload: JoinClassroomSuccessPayload
}

export interface JoinClassroomsFail {
    type: typeof classroomActions.JOIN_FAILURE
    payload: ClassroomsFailPayload
}

export type ClassroomAction = 
    | GetClassroomsRequest
    | GetClassroomsSuccess
    | GetClassroomsFail
    | AddClassroomRequest
    | AddClassroomSuccess
    | AddClassroomsFail
    | JoinClassroomRequest
    | JoinClassroomSuccess
    | JoinClassroomsFail
    | ReloadClassroomsRequest