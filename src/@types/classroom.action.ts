import { actionConstants } from "@/actions/actions.constant";
import { AssignedClassroom, GetClassroomsCriteria } from "./model";

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
    type: typeof actionConstants.GETALL_REQUEST,
    payload: GetClassroomsCriteria
}

export interface GetClassroomsSuccess {
    type: typeof actionConstants.GETALL_SUCCESS
    payload: GetClassroomsSuccessPayload
}

export interface GetClassroomsFail {
    type: typeof actionConstants.GETALL_FAILURE
    payload: GetClassroomsFailPayload
}

export type GetClassroomsAction = 
    | GetClassroomsRequest
    | GetClassroomsSuccess
    | GetClassroomsFail