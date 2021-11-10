import { userService } from "@/services/service"
import { actionConstants } from "./actions.constant"

const getClassrooms = ()=>{
    const request = () => { return { type: actionConstants.GETALL_REQUEST } }
    const success = (users) => { return { type: actionConstants.GETALL_SUCCESS, users } }
    const failure = (error) => { return { type: actionConstants.GETALL_FAILURE, error } }
    return async dispatch=>{
        dispatch(request())
        const res = await userService.getClassrooms(true)
        if(res){
            dispatch(success(res))
        } else {
            dispatch(failure("Fail to load"))
        }
    }
}

export const reduxAction = {
    getClassrooms
}
