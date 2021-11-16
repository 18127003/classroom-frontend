import { RedirectRequest } from "@/@types/common.action";
import { ClassroomDetailState, DetailAction, GetDetailFail, GetDetailSuccess, GetParticipantsFail, GetParticipantsSuccess } from "@/@types/detail.action";
import { authActions, commonAction, detailAction } from "@/constants/actions";

const initState:ClassroomDetailState = {
    loading: false, 
    participants: {
        data: [],
        reload: true
    }, 
    error: null,
    detail: undefined,
    redirect: {redirect:false}
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
                participants: {
                    data: (action as GetParticipantsSuccess).payload.participants,
                    reload: false
                },
                error:null
            };
        case detailAction.GET_PARTICIPANT_FAIL:
            return {
                ...state,
                loading: false,
                participants: {
                    data: [],
                    reload: true
                },
                error: (action as GetParticipantsFail).payload.error
            };
        case detailAction.RELOAD_PARTICIPANT_REQUEST:
            return {
                ...state,
                participants: {
                    data: state.participants.data,
                    reload: true
                }
            }
        case detailAction.GET_DETAIL_REQUEST:
            return {
                ...state,
                loading: true,
                participants:{
                    data:[],
                    reload:true
                }
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
        case commonAction.REDIRECT_REQUEST:
            return {
                ...state,
                redirect: {
                    redirect:true,
                    payload: (action as RedirectRequest).payload
                }
            }
        case commonAction.REDIRECT_SUCCESS:
            return {
                ...state,
                redirect: {
                    redirect: false
                }
            }
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}
