import {  DetailFailPayload, GetDetailFail, GetDetailRequest, GetDetailSuccess, GetDetailSuccessPayload, 
    GetParticipantsFail, GetParticipantsRequest, GetParticipantsSuccess, 
    GetParticipantsSuccessPayload, HideParticipantsFail, HideParticipantsRequest, 
    HideParticipantsSuccess, ReloadParticipantsRequest, RemoveParticipantsFail, 
    RemoveParticipantsRequest, RemoveParticipantsSuccess,RestartDetailRequest,SendInvitationRequest} from "@/@types/detail.action";
import { AssignedClassroom, InvitationRequestInfo, ModifyParticipantsInfo } from "@/@types/model";
import { detailAction } from "@/constants/actions";
import { classroomService } from "@/services";
import { all, call, put, takeLatest } from "@redux-saga/core/effects";

export const getParticipantsRequest = (classId: number): GetParticipantsRequest => ({
    type: detailAction.GET_PARTICIPANT_REQUEST,
    payload: classId
});

export const getParticipantsSuccess = (payload: GetParticipantsSuccessPayload):GetParticipantsSuccess =>({
    type: detailAction.GET_PARTICIPANT_SUCCESS,
    payload: payload
});

export const getParticipantsFail = (payload: DetailFailPayload):GetParticipantsFail =>({
    type: detailAction.GET_PARTICIPANT_FAIL,
    payload: payload
});

export const reloadParticipantsRequest = (): ReloadParticipantsRequest => ({
    type: detailAction.RELOAD_PARTICIPANT_REQUEST
});
 
function* getParticipantsSaga(action: GetParticipantsRequest) {
    try {
        const participants = yield call(classroomService.getParticipants, action.payload);
        yield put(getParticipantsSuccess({
            participants: participants.data
        }))
    } catch (e){
        yield put(getParticipantsFail({
            error: 'Get participants failed'
        }))
    }
}

export const getDetailRequest = (request: AssignedClassroom|number): GetDetailRequest => ({
    type: detailAction.GET_DETAIL_REQUEST,
    payload: request
});

export const getDetailSuccess = (payload: GetDetailSuccessPayload):GetDetailSuccess =>({
    type: detailAction.GET_DETAIL_SUCCESS,
    payload: payload
});

export const getDetailFail = (payload: DetailFailPayload):GetDetailFail =>({
    type: detailAction.GET_DETAIL_FAIL,
    payload: payload
});
 
function* getDetailSaga(action: GetDetailRequest) {
    var detail: AssignedClassroom;
    if (typeof(action.payload)==="number"){
        const res = yield call(classroomService.getClassroomDetail, action.payload);
        if(res){
            detail = res;
        }
    } else {
        detail = action.payload
    }

    if(detail) {
        yield put(getDetailSuccess({
            detail: detail
        }))
        yield put(restartDetailRequest())
    } else {
        yield put(getDetailFail({
            error: 'Get classroom detail failed'
        }))
    }
}

export const sendInvitationRequest = (request: InvitationRequestInfo): SendInvitationRequest => ({
    type: detailAction.SEND_INVITATION_REQUEST,
    payload: request
});

function* sendInvitationSaga(action: SendInvitationRequest) {
    yield call(classroomService.sendInvitationMail, action.payload)
}

export const removeParticipantsRequest = (request: ModifyParticipantsInfo): RemoveParticipantsRequest => ({
    type: detailAction.REMOVE_PARTICIPANT_REQUEST,
    payload: request
});

export const removeParticipantsSuccess = (msg: string):RemoveParticipantsSuccess =>({
    type: detailAction.REMOVE_PARTICIPANT_SUCCESS,
    payload: {msg}
});

export const removeParticipantsFail = (payload: DetailFailPayload):RemoveParticipantsFail =>({
    type: detailAction.REMOVE_PARTICIPANT_FAIL,
    payload: payload
});
 
function* removeParticipantsSaga(action: RemoveParticipantsRequest) {
    try {
        yield call(classroomService.removeParticipants, action.payload)
        yield put(removeParticipantsSuccess('Remove participant succeed'))
        yield put(reloadParticipantsRequest())
    } catch (e){
        yield put(removeParticipantsFail({
            error: 'Remove participants failed'
        }))
    }
}

export const hideParticipantsRequest = (request: ModifyParticipantsInfo): HideParticipantsRequest => ({
    type: detailAction.HIDE_PARTICIPANT_REQUEST,
    payload: request
});

export const hideParticipantsSuccess = (msg: string):HideParticipantsSuccess =>({
    type: detailAction.HIDE_PARTICIPANT_SUCCESS,
    payload: {msg}
});

export const hideParticipantsFail = (payload: DetailFailPayload):HideParticipantsFail =>({
    type: detailAction.HIDE_PARTICIPANT_FAIL,
    payload: payload
});
 
function* hideParticipantsSaga(action: HideParticipantsRequest) {
    try {
        yield call(classroomService.hideParticipants, action.payload)
        yield put(hideParticipantsSuccess('Hide participant succeed'))
        yield put(reloadParticipantsRequest())
    } catch (e){
        yield put(hideParticipantsFail({
            error: 'Hide participants failed'
        }))
    }
}

export const restartDetailRequest = (): RestartDetailRequest => ({
    type: detailAction.RESTART_DETAIL_REQUEST
});

export function* detailSaga() {
    yield all([
        takeLatest(detailAction.GET_PARTICIPANT_REQUEST, getParticipantsSaga),
        takeLatest(detailAction.GET_DETAIL_REQUEST, getDetailSaga),
        takeLatest(detailAction.SEND_INVITATION_REQUEST, sendInvitationSaga),
        takeLatest(detailAction.REMOVE_PARTICIPANT_REQUEST, removeParticipantsSaga),
        takeLatest(detailAction.HIDE_PARTICIPANT_REQUEST, hideParticipantsSaga)
    ]);
}

export default detailSaga;