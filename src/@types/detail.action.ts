import { detailAction } from "@/constants/actions";
import { Account, AssignedClassroom, InvitationRequestInfo, ModifyParticipantsInfo, Participant } from "./model";

export interface ClassroomDetailState {
    loading: boolean,
    participants: {
        data: Participant[],
        reload: boolean
    },
    detail: AssignedClassroom|null,
    error: string|null,
    redirect: {
        redirect: boolean,
        payload?: AssignedClassroom
    },
    msg: string|null
}

export interface MsgPayload{
    msg: string
}

export interface GetParticipantsSuccessPayload {
    participants: Participant[];
}

export interface DetailFailPayload{
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
    payload: DetailFailPayload
}

export interface ReloadParticipantsRequest{
    type: typeof detailAction.RELOAD_PARTICIPANT_REQUEST
}

export interface GetDetailSuccessPayload {
    detail: AssignedClassroom;
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
    payload: DetailFailPayload
}

export interface SendInvitationRequest{
    type: typeof detailAction.SEND_INVITATION_REQUEST,
    payload: InvitationRequestInfo
}

export interface RemoveParticipantsRequest{
    type: typeof detailAction.REMOVE_PARTICIPANT_REQUEST,
    payload: ModifyParticipantsInfo
}

export interface RemoveParticipantsSuccess {
    type: typeof detailAction.REMOVE_PARTICIPANT_SUCCESS,
    payload: MsgPayload
}

export interface RemoveParticipantsFail {
    type: typeof detailAction.REMOVE_PARTICIPANT_FAIL
    payload: DetailFailPayload
}

export interface HideParticipantsRequest{
    type: typeof detailAction.HIDE_PARTICIPANT_REQUEST,
    payload: ModifyParticipantsInfo
}

export interface HideParticipantsSuccess {
    type: typeof detailAction.HIDE_PARTICIPANT_REQUEST,
    payload: MsgPayload
}

export interface HideParticipantsFail {
    type: typeof detailAction.HIDE_PARTICIPANT_FAIL
    payload: DetailFailPayload
}

export interface RestartDetailRequest {
    type: typeof detailAction.RESTART_DETAIL_REQUEST
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

export type DetailAction = 
    | ParticipantAction
    | GetDetailRequest
    | GetDetailSuccess
    | GetDetailFail
    | SendInvitationRequest
    | RestartDetailRequest