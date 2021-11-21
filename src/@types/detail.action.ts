import { detailAction } from "@/constants/actions";
import { Account, AssignedClassroom, Assignment, InvitationRequestInfo, ModifyParticipantsInfo } from "./model";

export interface ClassroomDetailState {
    loading: boolean,
    participants: {
        data: Account[],
        reload: boolean
    },
    assignments: {
        data: Assignment[],
        reload: boolean
    }
    detail: AssignedClassroom|null,
    error: string|null,
    redirect: {
        redirect: boolean,
        payload?: AssignedClassroom
    }
}

export interface GetParticipantsSuccessPayload {
    participants: Account[];
}

export interface GetParticipantsFailPayload{
    error: string
}

export interface GetParticipantsRequest{
    type: typeof detailAction.GET_PARTICIPANT_REQUEST,
    payload: number //class ID
}

export interface GetParticipantsSuccess {
    type: typeof detailAction.GET_PARTICIPANT_SUCCESS
    payload: GetParticipantsSuccessPayload
}

export interface GetParticipantsFail {
    type: typeof detailAction.GET_PARTICIPANT_FAIL
    payload: GetParticipantsFailPayload
}

export interface ReloadParticipantsRequest{
    type: typeof detailAction.RELOAD_PARTICIPANT_REQUEST
}

export interface GetDetailSuccessPayload {
    detail: AssignedClassroom;
}

export interface GetDetailFailPayload{
    error: string
}

export interface GetDetailRequest{
    type: typeof detailAction.GET_DETAIL_REQUEST,
    payload: AssignedClassroom | number
}

export interface GetDetailSuccess {
    type: typeof detailAction.GET_DETAIL_SUCCESS
    payload: GetDetailSuccessPayload
}

export interface GetDetailFail {
    type: typeof detailAction.GET_DETAIL_FAIL
    payload: GetDetailFailPayload
}

export interface SendInvitationRequest{
    type: typeof detailAction.SEND_INVITATION_REQUEST,
    payload: InvitationRequestInfo
}

export interface RemoveParticipantsFailPayload{
    error: string
}

export interface RemoveParticipantsRequest{
    type: typeof detailAction.REMOVE_PARTICIPANT_REQUEST,
    payload: ModifyParticipantsInfo
}

export interface RemoveParticipantsSuccess {
    type: typeof detailAction.REMOVE_PARTICIPANT_SUCCESS
}

export interface RemoveParticipantsFail {
    type: typeof detailAction.REMOVE_PARTICIPANT_FAIL
    payload: RemoveParticipantsFailPayload
}

export interface HideParticipantsFailPayload{
    error: string
}

export interface HideParticipantsRequest{
    type: typeof detailAction.HIDE_PARTICIPANT_REQUEST,
    payload: ModifyParticipantsInfo
}

export interface HideParticipantsSuccess {
    type: typeof detailAction.HIDE_PARTICIPANT_REQUEST
}

export interface HideParticipantsFail {
    type: typeof detailAction.HIDE_PARTICIPANT_FAIL
    payload: HideParticipantsFailPayload
}

export interface GetAssignmentsSuccessPayload {
    assignments: Assignment[];
}

export interface GetAssignmentsFailPayload{
    error: string
}

export interface GetAssignmentsRequest{
    type: typeof detailAction.GET_ASSIGNMENTS_REQUEST,
    payload: number //class ID
}

export interface GetAssignmentsSuccess {
    type: typeof detailAction.GET_ASSIGNMENTS_SUCCESS
    payload: GetAssignmentsSuccessPayload
}

export interface GetAssignmentsFail {
    type: typeof detailAction.GET_ASSIGNMENTS_FAIL
    payload: GetAssignmentsFailPayload
}

export interface ReloadAssignmentsRequest{
    type: typeof detailAction.RELOAD_ASSIGNMENTS_REQUEST
}

export interface AddAssignmentSuccessPayload {
    assignment: Assignment;
}

export interface AddAssignmentFailPayload{
    error: string
}

export interface AddAssignmentRequest{
    type: typeof detailAction.ADD_ASSIGNMENT_REQUEST,
    payload: {
        id: number,
        assignment: Assignment
    }
}

export interface AddAssignmentSuccess {
    type: typeof detailAction.ADD_ASSIGNMENT_SUCCESS
    payload: AddAssignmentSuccessPayload
}

export interface AddAssignmentFail {
    type: typeof detailAction.ADD_ASSIGNMENT_FAIL
    payload: AddAssignmentFailPayload
}

export type ParticipantAction = 
    | RemoveParticipantsRequest
    | RemoveParticipantsFail
    | RemoveParticipantsFail
    | HideParticipantsRequest
    | HideParticipantsFail
    | HideParticipantsFail
    | GetParticipantsRequest
    | GetParticipantsSuccess
    | GetParticipantsFail
    | ReloadParticipantsRequest

export type AssignmentAction = 
    | GetAssignmentsRequest
    | GetAssignmentsSuccess
    | GetAssignmentsFail
    | ReloadAssignmentsRequest
    | AddAssignmentRequest
    | AddAssignmentSuccess
    | AddAssignmentFail

export type DetailAction = 
    | ParticipantAction
    | AssignmentAction
    | GetDetailRequest
    | GetDetailSuccess
    | GetDetailFail
    | SendInvitationRequest