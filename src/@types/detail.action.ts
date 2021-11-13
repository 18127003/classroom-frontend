import { detailAction } from "@/constants/actions";
import { Account, AssignedClassroom, InvitationRequestInfo } from "./model";

export interface ClassroomDetailState {
    loading: boolean,
    participants: Account[],
    detail: AssignedClassroom|null,
    error: string|null
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

export type DetailAction = 
    | GetParticipantsRequest
    | GetParticipantsSuccess
    | GetParticipantsFail
    | GetDetailRequest
    | GetDetailSuccess
    | GetDetailFail
    | SendInvitationRequest