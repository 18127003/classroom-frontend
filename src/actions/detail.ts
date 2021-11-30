import {  GetDetailFail, GetDetailFailPayload, GetDetailRequest, GetDetailSuccess, GetDetailSuccessPayload, 
    GetParticipantsFail, GetParticipantsFailPayload, GetParticipantsRequest, GetParticipantsSuccess, 
    GetParticipantsSuccessPayload, HideParticipantsFail, HideParticipantsFailPayload, HideParticipantsRequest, 
    HideParticipantsSuccess, ReloadParticipantsRequest, RemoveParticipantsFail, RemoveParticipantsFailPayload, 
    RemoveParticipantsRequest, RemoveParticipantsSuccess,
     SendInvitationRequest,
     UpdateStudentIdFail,
     UpdateStudentIdFailPayload,
     UpdateStudentIdRequest,
     UpdateStudentIdSuccess,
     UpdateStudentIdSuccessPayload} from "@/@types/detail.action";
import { AssignedClassroom, InvitationRequestInfo, ModifyParticipantsInfo } from "@/@types/model";
import { detailAction } from "@/constants/actions";
import { classroomService } from "@/services";
import { all, call, put, takeLatest } from "@redux-saga/core/effects";
import { reloadClassroomRequest } from "./classrooms";

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

export const removeParticipantsRequest = (request: ModifyParticipantsInfo): RemoveParticipantsRequest => ({
    type: detailAction.REMOVE_PARTICIPANT_REQUEST,
    payload: request
});

export const removeParticipantsSuccess = ():RemoveParticipantsSuccess =>({
    type: detailAction.REMOVE_PARTICIPANT_SUCCESS
    // payload: payload
});

export const removeParticipantsFail = (payload: RemoveParticipantsFailPayload):RemoveParticipantsFail =>({
    type: detailAction.REMOVE_PARTICIPANT_FAIL,
    payload: payload
});
 
function* removeParticipantsSaga(action: RemoveParticipantsRequest) {
    try {
        yield call(classroomService.removeParticipants, action.payload)
        yield put(removeParticipantsSuccess())
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

export const hideParticipantsSuccess = ():HideParticipantsSuccess =>({
    type: detailAction.HIDE_PARTICIPANT_SUCCESS
    // payload: payload
});

export const hideParticipantsFail = (payload: HideParticipantsFailPayload):HideParticipantsFail =>({
    type: detailAction.HIDE_PARTICIPANT_FAIL,
    payload: payload
});
 
function* hideParticipantsSaga(action: HideParticipantsRequest) {
    try {
        yield call(classroomService.hideParticipants, action.payload)
        yield put(hideParticipantsSuccess())
        yield put(reloadParticipantsRequest())
    } catch (e){
        yield put(hideParticipantsFail({
            error: 'Hide participants failed'
        }))
    }
}

export const updateStudentIdRequest = (classId: number, studentId: string): UpdateStudentIdRequest => ({
    type: detailAction.UPDATE_STUDENTID_REQUEST,
    payload: {
        classId,
        studentId
    }
});

export const updateStudentIdSuccess = (payload: UpdateStudentIdSuccessPayload):UpdateStudentIdSuccess =>({
    type: detailAction.UPDATE_STUDENTID_SUCCESS,
    payload: payload
});

export const updateStudentIdFail = (payload: UpdateStudentIdFailPayload):UpdateStudentIdFail =>({
    type: detailAction.UPDATE_STUDENTID_FAIL,
    payload: payload
});
 
function* updateStudentIdSaga(action: UpdateStudentIdRequest) {
    try {
        yield call(classroomService.updateStudentId, action.payload.classId, action.payload.studentId)
        yield put(updateStudentIdSuccess({
            studentId: action.payload.studentId
        }))
        yield put(reloadClassroomRequest())
    } catch (e){
        yield put(updateStudentIdFail({
            error: 'Update student ID failed'
        }))
    }
}

export function* detailSaga() {
    yield all([
        takeLatest(detailAction.GET_PARTICIPANT_REQUEST, getParticipantsSaga),
        takeLatest(detailAction.GET_DETAIL_REQUEST, getDetailSaga),
        takeLatest(detailAction.SEND_INVITATION_REQUEST, sendInvitationSaga),
        takeLatest(detailAction.REMOVE_PARTICIPANT_REQUEST, removeParticipantsSaga),
        takeLatest(detailAction.HIDE_PARTICIPANT_REQUEST, hideParticipantsSaga),
        takeLatest(detailAction.UPDATE_STUDENTID_REQUEST, updateStudentIdSaga)
    ]);
}

export default detailSaga;