import { AuthState, AuthAction, AuthSuccess, AuthFail } from "@/@types/action.type";
import { actionConstants } from "@/actions/actions.constant";

const initState:AuthState = {loading:false, user: null, error:null}

export const authReducer = (state: AuthState = initState, action: AuthAction):AuthState=>{
    switch(action.type){
        case actionConstants.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case actionConstants.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: (action as AuthSuccess).payload.user,
                error:null
            };
        case actionConstants.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: (action as AuthFail).payload.error
            };
        default:
            return state;
    }
}