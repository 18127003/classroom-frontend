import {  GetDetailFail, GetDetailFailPayload, GetDetailRequest, GetDetailSuccess, GetDetailSuccessPayload, 
    GetParticipantsFail, GetParticipantsFailPayload, GetParticipantsRequest, GetParticipantsSuccess, 
    GetParticipantsSuccessPayload, HideParticipantsFail, HideParticipantsFailPayload, HideParticipantsRequest, 
    HideParticipantsSuccess, ReloadParticipantsRequest, RemoveParticipantsFail, RemoveParticipantsFailPayload, 
    RemoveParticipantsRequest, RemoveParticipantsSuccess,
     SendInvitationRequest} from "@/@types/detail.action";
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

// export const getAssignmentsRequest = (classId: number): GetAssignmentsRequest => ({
//     type: detailAction.GET_ASSIGNMENTS_REQUEST,
//     payload: classId
// });

// export const getAssignmentsSuccess = (payload: GetAssignmentsSuccessPayload):GetAssignmentsSuccess =>({
//     type: detailAction.GET_ASSIGNMENTS_SUCCESS,
//     payload: payload
// });

// export const getAssignmentsFail = (payload: GetAssignmentsFailPayload):GetAssignmentsFail =>({
//     type: detailAction.GET_ASSIGNMENTS_FAIL,
//     payload: payload
// });

// export const reloadAssignmentsRequest = (): ReloadAssignmentsRequest => ({
//     type: detailAction.RELOAD_ASSIGNMENTS_REQUEST
// });
 
// function* getAssignmentsSaga(action: GetAssignmentsRequest) {
//     try {
//         const assignments = yield call(classroomService.getAssignments, action.payload);
//         yield put(getAssignmentsSuccess({
//             assignments: assignments.data
//         }))
//     } catch (e) {
//         yield put(getAssignmentsFail({
//             error: 'Get assignments failed'
//         }))
//     }
// }

// export const addAssignmentRequest = (classId: number, assignment: Assignment): AddAssignmentRequest => ({
//     type: detailAction.ADD_ASSIGNMENT_REQUEST,
//     payload: {
//         id: classId,
//         assignment: assignment
//     }
// });

// export const addAssignmentSuccess = (payload: AddAssignmentSuccessPayload):AddAssignmentSuccess =>({
//     type: detailAction.ADD_ASSIGNMENT_SUCCESS,
//     payload: payload
// });

// export const addAssignmentFail = (payload: AddAssignmentFailPayload):AddAssignmentFail =>({
//     type: detailAction.ADD_ASSIGNMENT_FAIL,
//     payload: payload
// });

// function* addAssignmentSaga(action: AddAssignmentRequest) {
//     try {
//         const assignment = yield call(classroomService.addAssignment, action.payload.id, action.payload.assignment);
//         yield put(addAssignmentSuccess({
//             assignment: assignment.data,
//             index: action.payload.assignment.position
//         }))
//         yield put(updatePositionRequest(action.payload.id))

//     } catch (e) {
//         yield put(addAssignmentFail({
//             error: 'Add assignment failed'
//         }))
//     }
// }

// export const updatePositionRequest = (classId:number, start?:number, end?:number): UpdatePositionRequest => ({
//     type: detailAction.UPDATE_POSITION_REQUEST,
//     payload: {
//         classId,
//         start,
//         end
//     }
// });

// export const updatePositionSuccess = (payload: UpdatePositionSuccessPayload):UpdatePositionSuccess =>({
//     type: detailAction.UPDATE_POSITION_SUCCESS,
//     payload: payload
// });

// export const updatePositionFail = (payload: UpdatePositionFailPayload):UpdatePositionFail =>({
//     type: detailAction.UPDATE_POSITION_FAIL,
//     payload: payload
// });

// function* updatePositionSaga(action: UpdatePositionRequest) {
    
//     const assignments: Assignment[] = yield select((state:AppState)=>state.detail.assignments.data)
//     const result = Array.from(assignments);
//     if(action.payload.start!==undefined && action.payload.end!==undefined){
//         const [removed] = result.splice(action.payload.start, 1);
//         result.splice(action.payload.end, 0, removed);
//         yield put(updatePositionSuccess({
//             assignments: result
//         }))
//     }
    
//     try {
//         yield call(classroomService.updateAssignmentPosition, action.payload.classId, result)
//     } catch (e){
//         yield put (updatePositionFail({
//             error: 'Update assignment position failed'
//         }))
//     }
// }

// export const removeAssignmentRequest = (classId: number, id: number): RemoveAssignmentRequest => ({
//     type: detailAction.REMOVE_ASSIGNMENT_REQUEST,
//     payload: {
//         classId: classId,
//         id: id
//     }
// });

// export const removeAssignmentSuccess = (payload: RemoveAssignmentSuccessPayload):RemoveAssignmentSuccess =>({
//     type: detailAction.REMOVE_ASSIGNMENT_SUCCESS,
//     payload: payload
// });

// export const removeAssignmentFail = (payload: RemoveAssignmentFailPayload):RemoveAssignmentFail =>({
//     type: detailAction.REMOVE_ASSIGNMENT_FAIL,
//     payload: payload
// });

// function* removeAssignmentSaga(action: RemoveAssignmentRequest) {
//     try {
//         yield call(classroomService.removeAssignment, action.payload.classId, action.payload.id);
//         yield put(removeAssignmentSuccess({
//             id: action.payload.id
//         }))
//         yield put(updatePositionRequest(action.payload.classId))

//     } catch (e) {
//         yield put(removeAssignmentFail({
//             error: 'Remove assignment failed'
//         }))
//     }
// }

// export const updateAssignmentRequest = (classId: number, id: number, assignment: Assignment): UpdateAssignmentRequest => ({
//     type: detailAction.UPDATE_ASSIGNMENT_REQUEST,
//     payload: {
//         classId: classId,
//         id: id,
//         assignment: assignment
//     }
// });

// export const updateAssignmentSuccess = (payload: UpdateAssignmentSuccessPayload):UpdateAssignmentSuccess =>({
//     type: detailAction.UPDATE_ASSIGNMENT_SUCCESS,
//     payload: payload
// });

// export const updateAssignmentFail = (payload: UpdateAssignmentFailPayload):UpdateAssignmentFail =>({
//     type: detailAction.UPDATE_ASSIGNMENT_FAIL,
//     payload: payload
// });

// function* updateAssignmentSaga(action: UpdateAssignmentRequest) {
//     try {
//         var assignment = yield call(classroomService.updateAssignment, action.payload.classId, action.payload.id, action.payload.assignment);
//         yield put(updateAssignmentSuccess({
//             assignment: assignment.data
//         }))

//     } catch (e) {
//         yield put(updateAssignmentFail({
//             error: 'Update assignment failed'
//         }))
//     }
// }

export function* detailSaga() {
    yield all([
        takeLatest(detailAction.GET_PARTICIPANT_REQUEST, getParticipantsSaga),
        takeLatest(detailAction.GET_DETAIL_REQUEST, getDetailSaga),
        takeLatest(detailAction.SEND_INVITATION_REQUEST, sendInvitationSaga),
        takeLatest(detailAction.REMOVE_PARTICIPANT_REQUEST, removeParticipantsSaga),
        takeLatest(detailAction.HIDE_PARTICIPANT_REQUEST, hideParticipantsSaga),
        // takeLatest(detailAction.GET_ASSIGNMENTS_REQUEST, getAssignmentsSaga),
        // takeEvery(detailAction.ADD_ASSIGNMENT_REQUEST, addAssignmentSaga),
        // takeLatest(detailAction.UPDATE_POSITION_REQUEST, updatePositionSaga),
        // takeEvery(detailAction.REMOVE_ASSIGNMENT_REQUEST, removeAssignmentSaga),
        // takeEvery(detailAction.UPDATE_ASSIGNMENT_REQUEST, updateAssignmentSaga)
    ]);
}

export default detailSaga;