import { detailAction } from "@/constants/actions";
import { Account, AssignedClassroom } from "./model";

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

export type DetailAction = 
    | GetParticipantsRequest
    | GetParticipantsSuccess
    | GetParticipantsFail