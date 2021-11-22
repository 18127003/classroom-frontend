import { RedirectRequest } from "@/@types/common.action";
import { AddAssignmentFail, AddAssignmentSuccess, ClassroomDetailState, DetailAction, GetAssignmentsFail, GetAssignmentsSuccess, GetDetailFail, GetDetailSuccess, GetParticipantsFail, GetParticipantsSuccess, HideParticipantsFail, RemoveParticipantsFail, UpdatePositionFail, UpdatePositionSuccess } from "@/@types/detail.action";
import { authActions, commonAction, detailAction } from "@/constants/actions";

const initState:ClassroomDetailState = {
    loading: false, 
    participants: {
        data: [],
        reload: true
    }, 
    assignments: {
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
        case detailAction.REMOVE_PARTICIPANT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case detailAction.REMOVE_PARTICIPANT_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as RemoveParticipantsFail).payload.error
            }
        case detailAction.HIDE_PARTICIPANT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case detailAction.HIDE_PARTICIPANT_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as HideParticipantsFail).payload.error
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
        case detailAction.GET_ASSIGNMENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case detailAction.GET_ASSIGNMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                assignments: {
                    data: (action as GetAssignmentsSuccess).payload.assignments,
                    reload: false
                },
                error:null
            };
        case detailAction.GET_ASSIGNMENTS_FAIL:
            return {
                ...state,
                loading: false,
                assignments: {
                    data: [],
                    reload: true
                },
                error: (action as GetAssignmentsFail).payload.error
            };
        case detailAction.RELOAD_ASSIGNMENTS_REQUEST:
            return {
                ...state,
                assignments: {
                    data: state.assignments.data,
                    reload: true
                }
            }
        case detailAction.ADD_ASSIGNMENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case detailAction.ADD_ASSIGNMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                assignments:{
                    data: [
                        ...state.assignments.data,
                        (action as AddAssignmentSuccess).payload.assignment
                    ],
                    reload: false
                },
                error: null
            };
        case detailAction.ADD_ASSIGNMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as AddAssignmentFail).payload.error
            }
        case detailAction.UPDATE_POSITION_SUCCESS:
            return {
                ...state,
                assignments: {
                    data: (action as UpdatePositionSuccess).payload.assignments,
                    reload: false
                }
            }
        case detailAction.UPDATE_POSITION_FAIL:
            return {
                ...state,
                error: (action as UpdatePositionFail).payload.error
            }
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}
