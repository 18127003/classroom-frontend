import { ClassroomsState, GetClassroomsAction, GetClassroomsFail, GetClassroomsSuccess } from "@/@types/classroom.action";
import { actionConstants } from "@/actions/actions.constant";

const initState:ClassroomsState = {loading:false, classes: [], error:null}

export const classroomsReducer = (state: ClassroomsState = initState, action: GetClassroomsAction):ClassroomsState=>{
    console.log(action.type)
    switch(action.type){
        case actionConstants.GETALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionConstants.GETALL_SUCCESS:
            return {
                ...state,
                loading: false,
                classes: (action as GetClassroomsSuccess).payload.classes,
                error:null
            };
        case actionConstants.GETALL_FAILURE:
            return {
                ...state,
                loading: false,
                classes: [],
                error: (action as GetClassroomsFail).payload.error
            };
        default:
            return state;
    }
}
