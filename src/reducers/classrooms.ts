import { ClassroomAction } from "@/@types/props";
import { ClassroomsState } from "@/@types/state";
import { actionConstants } from "@/actions/actions.constant";

export const classrooms = (state:ClassroomsState = {loading: false}, action: ClassroomAction)=>{
    switch(action.type){
        case actionConstants.GETALL_REQUEST:
            return {
                loading: true
            }
        case actionConstants.GETALL_SUCCESS:
            return {
                classes: action.data 
            }
        case actionConstants.GETALL_FAILURE:
            return {
                error: action.error
            }
        default:
            return state;
    }
}