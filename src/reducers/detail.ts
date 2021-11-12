import { ClassroomDetailState, DetailAction, GetDetailFail, GetDetailSuccess, GetParticipantsFail, GetParticipantsSuccess } from "@/@types/detail.action";
import { authActions, detailAction } from "@/constants/actions";

const initState:ClassroomDetailState = {
    loading: false, 
    participants: [], 
    error: null,
    detail: undefined
}

export const detailReducer = (state: ClassroomDetailState = initState, action: DetailAction):ClassroomDetailState=>{
    switch(action.type){
        case detailAction.GET_PARTICIPANT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case detailAction.GET_PARTICIPANT_SUCCESS:
            return {
                ...state,
                loading: false,
                participants: (action as GetParticipantsSuccess).payload.participants,
                error:null
            };
        case detailAction.GET_PARTICIPANT_FAIL:
            return {
                ...state,
                loading: false,
                participants: [],
                error: (action as GetParticipantsFail).payload.error
            };
        case detailAction.GET_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case detailAction.GET_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                detail: (action as GetDetailSuccess).payload.detail,
                error:null
            };
        case detailAction.GET_DETAIL_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as GetDetailFail).payload.error
            };
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}
