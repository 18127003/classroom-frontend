import { AddClassroomsFail, ClassroomAction, ClassroomsState, GetClassroomsFail, GetClassroomsSuccess, JoinClassroomsFail, ReloadClassroomsRequest } from "@/@types/classroom.action";
import { authActions, classroomActions } from "@/constants/actions";

const initState:ClassroomsState = {
    loading:false, 
    classes: [], 
    error:null, 
    reload: {
        reload: true,
        fetch: false
    }
}

export const classroomsReducer = (state: ClassroomsState = initState, action: ClassroomAction):ClassroomsState=>{
    console.log(action.type)
    switch(action.type){
        case classroomActions.GETALL_REQUEST:
            return {
                ...state,
                loading: true,
                reload: {
                    reload: false,
                    fetch: false
                },
            };
        case classroomActions.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                classes: (action as GetClassroomsSuccess).payload.classes,
                error:null
            };
        case classroomActions.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                classes: [],
                error: (action as GetClassroomsFail).payload.error
            };
        case classroomActions.RELOAD_REQUEST:
            return {
                ...state,
                reload: {
                    reload: true,
                    fetch: (action as ReloadClassroomsRequest).payload.fetch
                }
            }
        case classroomActions.ADD_REQUEST:
            return {
                ...state,
                loading: true
            }
        case classroomActions.ADD_FAILURE:
            return{
                ...state,
                loading: false,
                error: (action as AddClassroomsFail).payload.error
            }
        case classroomActions.JOIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case classroomActions.JOIN_FAILURE:
            return{
                ...state,
                loading: false,
                error: (action as JoinClassroomsFail).payload.error
            } 
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}
