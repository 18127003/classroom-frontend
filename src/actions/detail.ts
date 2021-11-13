import { GetDetailFail, GetDetailFailPayload, GetDetailRequest, GetDetailSuccess, GetDetailSuccessPayload, GetParticipantsFail, GetParticipantsFailPayload, GetParticipantsRequest, GetParticipantsSuccess, GetParticipantsSuccessPayload, SendInvitationRequest } from "@/@types/detail.action";
import { AssignedClassroom, InvitationRequestInfo } from "@/@types/model";
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

export const getParticipantsFail = (payload: GetParticipantsFailPayload):GetParticipantsFail =>({
    type: detailAction.GET_PARTICIPANT_FAIL,
    payload: payload
});
 
function* getParticipantsSaga(action: GetParticipantsRequest) {
    const participants = yield call(classroomService.getParticipants, action.payload);
    if(participants) {
        yield put(getParticipantsSuccess({
            participants: participants.data
        }))
    } else {
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

export const getDetailFail = (payload: GetDetailFailPayload):GetDetailFail =>({
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

export function* detailSaga() {
    yield all([
        takeLatest(detailAction.GET_PARTICIPANT_REQUEST, getParticipantsSaga),
        takeLatest(detailAction.GET_DETAIL_REQUEST, getDetailSaga),
        takeLatest(detailAction.SEND_INVITATION_REQUEST, sendInvitationSaga),
    ]);
}

export default detailSaga;