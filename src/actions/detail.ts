import { GetParticipantsFail, GetParticipantsFailPayload, GetParticipantsRequest, GetParticipantsSuccess, GetParticipantsSuccessPayload } from "@/@types/detail.action";
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

export function* detailSaga() {
    yield all([
        takeLatest(detailAction.GET_PARTICIPANT_REQUEST, getParticipantsSaga),
    ]);
}

export default detailSaga;